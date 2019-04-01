import React from "react";
import RTCMultiConnection from "rtcmulticonnection";
import DetectRTC from "detectrtc";
import queryString from "query-string";
import SweetAlert from "react-bootstrap-sweetalert";
import buttonStyle from "../../../../../assets/jss/components/buttonStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '../../../../../core/components/CustomButton';
import Card from '../../../../../core/components/card/Card';
import CardHeader from '../../../../../core/components/card/CardHeader'
import CardBody from '../../../../../core/components/card/CardBody';

const style = ({
  ...buttonStyle,
  semMargen: {
    margin: 0,
    flex: 1
  },
  multilineTextField: {
    width: '100%'
  },
  inputCenterText: {
    textAlign: 'center'
  },
  videoConferenciaButton: {
    width: '130px',
    height:  '40px',
    margin: 0
  },
  flexCard: {
    display: 'flex'
  }
});

class VideoConferencia extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      roomId: "",
      invalidRoomId: false,
    };

    this.rtcConnection = new RTCMultiConnection();
    this.callbackOpenOrJoin = this.callbackOpenOrJoin.bind(this);
    this.onStreamRTC = this.onStreamRTC.bind(this);
    this.onStreamendedRTC = this.onStreamendedRTC.bind(this);
    this.onMediaError = this.onMediaErrorRTC.bind(this);
    this.onLeave = this.onLeaveRTC.bind(this);
  }

  componentDidMount() {
    this.configurarConexaoRTC();
    this.handleOnJoinRoom();
  }

  componentWillUnmount() {
    this.rtcConnection.onstream = null;
    this.rtcConnection.onstreamended = null;
    this.rtcConnection.onmediaerror = null;
    this.rtcConnection.onleave = null;
  }

  configurarConexaoRTC() {
    this.rtcConnection.socketURL = "https://medial.downet.com.br/";
    this.rtcConnection.socketMessageEvent = "video-conferencia-mediacao";

    this.rtcConnection.session = {
      audio: true,
      video: true
    };

    this.rtcConnection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };

    this.rtcConnection.videosContainer = document.getElementById("videos-container");
    this.rtcConnection.onstream = (event) => this.onStreamRTC(event);
    this.rtcConnection.onstreamended = (event) =>  this.onStreamendedRTC(event);
    this.rtcConnection.onmediaerror = (event, constraints) => this.onMediaErrorRTC(event, constraints);
    this.rtcConnection.onleave = (userid) => this.onLeaveRTC(userid);
  }

  onLeaveRTC(userid) {
    
    console.log('onLeaveRTC | userid: ' + userid);
  }

  onStreamRTC(event) {
    
    let existing = document.getElementById(event.streamid);

    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    event.mediaElement.style = 'width: 300px; margin: 1px'

    this.rtcConnection.videosContainer.appendChild(event.mediaElement);

    if (event.type === "local") {
      this.rtcConnection.socket.on("disconnect", function() {
        if (this.rtcConnection && !this.rtcConnection.getAllParticipants().length) {
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
  }

  onMediaErrorRTC(error, constraints) {
    if (error.message === "Concurrent mic process limit.") {
      if (DetectRTC.audioInputDevices.length <= 1) {
        alert(
          "Please select external microphone. Check github issue number 483."
        );
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

    let roomId = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;

    if (roomId === undefined) {
      this.setState({ invalidRoomId: true });
    } else {
      this.setState({ roomId: roomId, invalidRoomId: false });
      this.rtcConnection.openOrJoin(this.state.roomId, this.callbackOpenOrJoin());
    }
  }

  callbackOpenOrJoin(isRoomExist, roomid, error) {
    if (error) {
      alert(error);
    }
  }

  _handleDashboard() {
    this.props.history.push(`/`);
  }

  _handleClickMediacao() {
    
    this.rtcConnection.getAllParticipants().forEach(pid => this.rtcConnection.disconnectWith(pid));

    this.rtcConnection.attachStreams.forEach(localStream => localStream.stop());

    this.rtcConnection.closeSocket();

    this.props.history.goBack();
  }

  sweatMediacaoInvalida() {
    const { classes } = this.props;

    return (
      <SweetAlert
        error
        style={{ display: "block", color: `#222` }}
        onConfirm={() => this._handleDashboard()}
        confirmBtnCssClass={[classes.button, classes.warning].join(" ")}
        title="MEDIAÇÃO INVÁLIDA"
        confirmBtnText="MENU INICIAL"
        showCancel={false}
      >
        <h4>{`Ops! Não foi possível iniciar a vídeo conferência para essa mediação.`}</h4>
      </SweetAlert>
    );
  }

  _handleClickSolicitacao() {
    //Alterar redux para exibir motivo
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.invalidRoomId ? this.sweatMediacaoInvalida() : null}
        <Card>
          <CardHeader
            color='success'
            className={classes.flexCard}
          >
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Vídeo Conferência</h4>
            <Button
              className={classes.videoConferenciaButton}
              onClick={() => this._handleClickSolicitacao()}
            >
              Solicitação
            </Button>
          </CardHeader>
          <CardBody>
            <div id="videos-container" />
          </CardBody>
        </Card>
        <Button onClick={() => this._handleClickMediacao()} >
          Voltar
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(VideoConferencia);
