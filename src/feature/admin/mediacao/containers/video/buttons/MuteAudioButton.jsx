import React from 'react';
import PropTypes from 'prop-types';

class MuteAudioButton extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      className: 'control '  + (this.props.toggle.has('mute-audio') ? 'unmute-audio selected' : 'mute-audio')
    };
  }

  onClick() {
    const { mediaElement, config } = this.props;

    if (this.state.className.indexOf('unmute-audio') !== -1) {
      this.setState({
        className: 'mute-audio'
      });
      
      mediaElement.muted = false;
      mediaElement.volume = 1;
      if (config.onUnMuted) config.onUnMuted('audio');

    } else {
      this.setState({
        className: 'unmute-audio selected'
      });

      mediaElement.muted = true;
      mediaElement.volume = 0;
      if (config.onMuted) config.onMuted('audio');

    };
  }

  render() {

    if (!this.props.buttons.has('mute-audio')) return null;

    return(
      <div   
        className={this.state.className} 
        onClick={this.onClick()} 
      />
    );
  }
}

MuteAudioButton.propTypes = {
  mediaElement: PropTypes.element.isRequired,
  config: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired
};

export default MuteAudioButton;