import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'linkifyjs/react';
import ClassNames from 'classnames';
import RelativeDate from 'relative-date';
import '../../assets/scss/chatMessage.scss';


class ChatMessage extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    selfPosted: PropTypes.bool.isRequired,
    timestamp: PropTypes.number.isRequired
  }

  render() {
    const topWrapper = ClassNames({
      'talk-message-wrapper': true,
      'right': this.props.selfPosted,
      'left': !this.props.selfPosted
    });
    const contentWrapper = ClassNames({
      'talk-message-content-wrapper': true,
      'right': this.props.selfPosted,
      'left': !this.props.selfPosted
    });
    const authorMetadata = ClassNames({
      'talk-message-metadata-author': true,
      'self-posted': this.props.selfPosted
    });
    const linkifyOptions = {
      'nl2br': true
    };
    return(
      <div className={ topWrapper }>
        <div className={ contentWrapper }>
          <Linkify className='talk-message-content-span' options={ linkifyOptions } >
            { this.props.message }
          </Linkify>
        </div>
        <div className='talk-message-metadata'>
          <span className={ authorMetadata} >
            { this.props.author }
            <span className='talk-message-metadata-author-separator'> • </span>
          </span>
          <span className='talk-message-metadata-timestamp'>
            { RelativeDate(this.props.timestamp) }
          </span>
        </div>
      </div>
    );
  }
}

export default ChatMessage;