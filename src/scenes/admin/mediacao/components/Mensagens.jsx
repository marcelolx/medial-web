import React from 'react';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import CardFooter from '../../../../components/Card/CardFooter';
import { getWebSocketAddres } from '../../../../services/API';
import SockJsClient from 'react-stomp';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ChatInput from '../../../../components/Chat/ChatInput';
import ChatBox from '../../../../components/Chat/ChatBox';
import { CHAT, ENTROU, SAIU } from '../../../../services/admin/mediacao/messages';


const style = theme => ({  
  cardMensagens: {
    height: '478px'
  },
  semMargen: {
    margin: 0,
  },
  multilineTextField: {
    width: '100%'
  },
  icon: {
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    marginLeft: 4,
    marginRight: 'auto'
  },
  mensagemEnviada: {
    align: 'right'
  }
});

class Mensagens extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      clientConnected: false,
      topic: ''
    }
  }

  onMessageReceived(payload) {
    if ((payload.messageType !== ENTROU) && (payload.messageType !== SAIU)) {
      this.setState(prevState => ({
        messages: [...prevState.messages, payload]
      }));
    }
  }

  onSendMessage = (msg) => {
    return this.sendMessageTo('sendMessage', CHAT, msg, this.state.topic);
  }

  onConnected() {
    const topic = `/medial/chat/${this.props.mediacao.mediacao.protocolo}`;

    this.sendMessageTo('addUser', ENTROU, '', topic);
    
    this.setState({
      clientConnected: true,
      topic
    });
  }

  sendMessageTo(endpoint, messageType, message, topic) {
    try {
      const data = {
        authorId: this.props.auth.id,
        author: this.props.auth.nome,
        message: message,
        timestamp: Date.now(),
        messageType: messageType,
        mediacao: this.props.mediacao.mediacao.protocolo,
      }

      this.clientRef.sendMessage(`${topic}/${endpoint}`, JSON.stringify(data));
      return true;
    } catch(e) {
      return false;
    }
  }
  
  onErrorConnect(error) {
    console.log(error);
    console.log('não conectou');
    
    
    //connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    //connectingElement.style.color = 'red';
  }

  onSockJSClient() {
    return (
      <SockJsClient 
        url={getWebSocketAddres()}
        topics={[`/channel/${this.props.mediacao.mediacao.protocolo}`]}
        onConnect={ () => { this.onConnected() } }
        onError={ (error) => { this.onErrorConnect(error) } }
        onMessage={(msg) => { this.onMessageReceived(msg) }}
        ref={ (client) => { this.clientRef = client }} 
      />
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        {this.props.mediacao.mediacao !== null ? this.onSockJSClient() : null}
        <Card className={classes.cardMensagens}>
          <CardHeader color="success">
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mensagens</h4>
          </CardHeader>
          <CardBody>
            <ChatBox 
               currentUserId={ this.props.auth.id.toString() }
               currentUser={ this.props.auth.nome } 
               messages={ this.state.messages }
            />
          </CardBody>
          <CardFooter>
            <ChatInput
              onSendMessage={ this.onSendMessage }
              disabled={ !this.state.clientConnected }
            />
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mediacao: state.mediacao,
  auth: state.auth
});

export default compose(
  withStyles(style),
  connect(mapStateToProps)
)(Mensagens);