import React from 'react';
import RTCMultiConnection from 'rtcmulticonnection';
import VideoMediaElement from './VideoMediaElement';
import DetectRTC from 'detectrtc';

class VideoConferencia extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      roomId: ''
    }
    
    this.rtcConnection = new RTCMultiConnection();
    this.callbackOpenOrJoin = this.callbackOpenOrJoin.bind(this);
    this.onStreamRTC = this.onStreamRTC.bind(this);
    this.onStreamendedRTC = this.onStreamendedRTC.bind(this);
    this.onMediaError = this.onMediaError.bind(this);
  }

  componentDidMount() {
    
    this.configurarConexaoRTC();
  }

  configurarConexaoRTC() {    
    //this.rtcConnection.socketURL = 'https://192.168.0.126:9001/';
    this.rtcConnection.socketURL = 'http://192.168.0.126:9003/';
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
    this.rtcConnection.onStream = (event) => this.onStreamRTC(event);
    this.rtcConnection.onstreamended = (event) => this.onStreamendedRTC(event);
  }

  onStreamRTC(event) {
    let existing = document.getElementById(event.streamid);
    
    if(existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    this.rtcConnection.videosContainer.appendChild(event.mediaElement);


    if (event.type === 'local') {
      this.rtcConnection.socket.on('disconnect', function() {
        if (!this.rtcConnection.getAllParticipants().length) {
          window.location.reload();
        }
      });
    }
  }

  onStreamendedRTC(event) {
    let mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
      mediaElement.parentNode.removeChild(mediaElement);
    }
  };

  onMediaError(error) {
    if (error.message === 'Concurrent mic process limit.') {
      if (DetectRTC.audioInputDevices.length <= 1) {
          alert('Please select external microphone. Check github issue number 483.');
          return;
      }

      let secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
      this.rtcConnection.mediaConstraints.audio = {
          deviceId: secondaryMic
      };

      this.rtcConnection.join(this.rtcConnection.sessionid);
    }
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