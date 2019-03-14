import React from 'react';
import PropTypes from 'prop-types';

import '../../../../../assets/css/VideoMediaElement.css';
import MuteAudioButton from './buttons/MuteAudioButton';

class VideoMediaElement extends React.PureComponent {

  constructor(props) {
    super(props);

    this.buttons = null;
    this.toggle = null;
  }

  media = this.props.mediaElement;

  componentDidMount() {
    this.prepareButtons();
    this.prepareToggle();
  }

  prepareButtons() {
    const { config } = this.props;

    this.buttons = config.buttons || ['mute-audio', 'mute-video', 'full-screen', 'volume-slider', 'stop'];
    this.buttons.has = (element) => this.buttons.indexOf(element) !== -1;
  }

  prepareToggle() {
    const { config } = this.props;

    this.toggle = config.toggle || [];
    this.toggle.has = (element) => this.toggle.indexOf(element) !== -1;
  }

  render() {
    const { config, mediaElement } = this.props;

    return (
      <div className="media-container">
        <div className="media-controls">
          <MuteAudioButton 
            mediaElement={mediaElement}
            config={config}
            buttons={this.buttons}
          />
        </div>
      </div>
    );
  }
}

VideoMediaElement.propTypes = {
  mediaElement: PropTypes.element.isRequired,
  config: PropTypes.object.isRequired
};

export default VideoMediaElement;