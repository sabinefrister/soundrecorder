import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class MicrophoneAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMicrophone = this.getMicrophone.bind(this);
    }

  async getMicrophone() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.props.getStreamData(stream)
  }

  render() {
    return (
      <React.Fragment>
          <Button size="lg" onClick={this.getMicrophone}>
            Allow microphone input
          </Button>
      </React.Fragment>
    );
  }
}

export default MicrophoneAccess;
