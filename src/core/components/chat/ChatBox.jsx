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
    this.messages = [];

  }

  componentWillUpdate() {
    let diferenca = this.props.messages.length - this.messages.length;

    if (diferenca > 0) {
      this.messages = this.props.messages;

      if (diferenca > 10) {

        scroll.scrollTo(1200, {
          containerId: this.chatBoxId,
          duration: 0,
          delay: 0,
          smooth: "easeInOutQuint",
        })
      }

      if (diferenca < 10) {
        this.scrollToBottom();
      }

    }
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({ containerId: this.chatBoxId });
  }

  handleScroll(event, canLoadMoreData) {
    if (event.target.scrollTop === 0 && canLoadMoreData) {
      this.props.loadMoreData();
    }
  }


  render() {
    return (
      <div className='talk-box-wrapper custom' style={this.props.style}>
        <div className={`talk-box-body`} ref="messageList" name={this.chatBoxId} id={this.chatBoxId} onScroll={(evt) => this.handleScroll(evt, this.props.canLoadMoreData)}>
          {this.props.messages.map((item, i) => <ChatMessage
            key={i}
            timestamp={parseInt(item.timestamp)}
            message={item.message}
            author={item.author}
            authorId={item.authorId}
            selfPosted={item.authorId === this.props.currentUserId} />)}
        </div>
      </div>
    );
  }
}

export default ChatBox;