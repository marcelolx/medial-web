import React from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import VideoMediaElement from './VideoMediaElement';

class VideoConferencia extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      roomId: ''
    }
    
    this.rtcConnection = new RTCMultiConnection();
    this.callbackOpenOrJoin = this.callbackOpenOrJoin.bind(this);
  }

  componentDidMount() {
    
    this.configurarConexaoRTC();
  }

  configurarConexaoRTC() {    
    //this.rtcConnection.socketURL = 'https://192.168.0.126:9001/';
    this.rtcConnection.socketURL = 'http://192.168.0.126:9002/';
    this.rtcConnection.socketMessageEvent = 'video-conference-demo';
    
    this.rtcConnection.session = {
        audio: true,
        video: true
    };

    this.rtcConnection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };

    this.rtcConnection.videosContainer = document.getElementById('videos-container');
    this.rtcConnection.onStream = () => this.onStreamRTC();
  }

  onStreamRTC(event) {
    let existing = document.getElementById(event.streamid);
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    event.mediaElement.removeAttribute('src');
    event.mediaElement.removeAttribute('srcObject');
    event.mediaElement.muted = true;
    event.mediaElement.volume = 0;

    let video = document.createElement('video');

    try {
      video.setAttributeNode(document.createAttribute('autoplay'));
      video.setAttributeNode(document.createAttribute('playsinline'));
    } catch (e) {
      video.setAttribute('autoplay', true);
      video.setAttribute('playsinline', true);
    }

    if(event.type === 'local') {
      video.volume = 0;
      try {
          video.setAttributeNode(document.createAttribute('muted'));
      } catch (e) {
          video.setAttribute('muted', true);
      }
    }
    video.srcObject = event.stream;

    let width = parseInt(this.rtcConnection.videosContainer.clientWidth / 3) - 20;

    let videoConfig = {
      title: event.userid,
      buttons: ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop', 'record-audio', 'record-video'],
      width: width,
      showOnMouseEnter: false,
    }

    let videoMediaElement = <VideoMediaElement mediaElement={video} config={videoConfig}/>;

    this.rtcConnection.videosContainer.appendChild(videoMediaElement);

    setTimeout(() => {
      videoMediaElement.media.play();
    }, 5000);

    videoMediaElement.id = event.streamid;

    this.salvarIdSalaCache();
  }

  salvarIdSalaCache() {
    localStorage.setItem(this.rtcConnection.socketMessageEvent, this.rtcConnection.sessionid);
  }

  handleOnJoinRoom() {
    this.rtcConnection.openOrJoin(this.state.roomId, this.callbackOpenOrJoin());
  }

  callbackOpenOrJoin(isRoomExist, roomid, error) {
    if (error) {
      alert(error);
    } else if (this.rtcConnection.isInitiator === true) {
      //
    }
  }

  handleRoomIdChange(event) {
    this.setState({ roomId: event.target.value });
  }

  render() {
    console.log(this.state);

    return(
      <section>
        <div>
          <input 
            type="text" 
            id="id-sala" 
            autoCorrect="off" 
            autoCapitalize="off" 
            size="20" 
            value={this.state.roomId}
            onChange={(event) => this.handleRoomIdChange(event)}
          />
          <button id="criar-ou-entrar-sala" onClick={() => this.handleOnJoinRoom()}>Entrar</button>
        </div>
        
        <div id="videos-container">

        
        </div>

      </section>
    );
  }
}

export default VideoConferencia;