import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import { animateScroll as scroll } from 'react-scroll';
import '../../../assets/scss/chatBox.scss';

const htmlId = require('react-html-id');

class ChatBox extends React.Component {

  static defaultProps = {
    connected: true
  }

  static propTypes = {
    currentUser: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      authorId: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      messageType: PropTypes.string.isRequired
    })),
    
    style: PropTypes.object
  }

  constructor(props) {
    super(props);
    htmlId.enableUniqueIds(this);
    this.chatBoxId = this.nextUniqueId();    
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({ containerId: this.chatBoxId });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    return(
      <div className='talk-box-wrapper custom' style={ this.props.style }>
        <div className='talk-box-body' id={ this.chatBoxId }>
          {this.props.messages.map((item, i) => <ChatMessage 
            key={i} 
            timestamp={ parseInt(item.timestamp) }
            message={ item.message } 
            author={ item.author } 
            authorId={ item.authorId }
            selfPosted={ item.authorId === this.props.currentUserId } />)}
          {(this.scrollToBottom())}
        </div>
      </div>
    );
  }
}

export default ChatBox;