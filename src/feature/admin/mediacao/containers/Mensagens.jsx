import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import withStyles from '@material-ui/core/styles/withStyles';
import CardFooter from '../../../../core/components/card/CardFooter';
import { getWebSocketAddres } from '../../../../core/http/API';
import SockJsClient from 'react-stomp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import ChatInput from '../../../../core/components/chat/ChatInput';
import ChatBox from '../../../../core/components/chat/ChatBox';
import { CHAT, ENTROU, SAIU } from '../utils/mediacaoMessagesHelper';

import * as mediacaoActions from '../services/mediacaoActions';

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

  state = {
    messages: [],
    clientConnected: false,
    topic: '',
    offset: 0,
  }

  componentWillMount() {
    let limit = 20;
    let offset = this.state.offset;
    this.props.actions.adquirirMensagem(this.props.idMediacao, offset, limit);
    this.setState({ offset: offset + limit });
  }

  componentWillUpdate() {
    if (this.props.mediacao.isLoadedMensagem) {
      this.props.actions.limparDadosMensagens();
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
    } catch (e) {
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
        onConnect={() => { this.onConnected() }}
        onError={(error) => { this.onErrorConnect(error) }}
        onMessage={(msg) => { this.onMessageReceived(msg) }}
        ref={(client) => { this.clientRef = client }}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.props.mediacao.mediacao !== null ? this.onSockJSClient() : null}
        <Card className={classes.cardMensagens}>
          <CardHeader color='success'>
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mensagens</h4>
          </CardHeader>
          <CardBody>
            <ChatBox
              currentUserId={this.props.auth.id.toString()}
              currentUser={this.props.auth.nome}
              messages={this.state.messages}
            />
          </CardBody>
          <CardFooter>
            <ChatInput
              onSendMessage={this.onSendMessage}
              disabled={!this.state.clientConnected}
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacaoActions,
  }, dispatch)
});


export default compose(
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps)
)(Mensagens);