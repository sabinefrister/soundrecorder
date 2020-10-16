import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Recorder from './Recorder';

class MicrophoneAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    }

  async getMicrophone() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.props.getStreamData(stream)
  }

  stopMicrophone() {
    this.props.stream.getTracks().forEach(track => track.stop());
    this.props.stopMicrophoneAccess()
  }

  toggleMicrophone() {
    if (this.props.streamAvailable) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <React.Fragment>
          <Button onClick={this.toggleMicrophone}>
            {this.props.streamAvailable ? 'Stop microphone input' : 'Allow microphone input'} 
          </Button>
      </React.Fragment>
    );
  }
}

// streamavailale
// {this.state.audio ? <Recorder stream={this.state.audio} /> : console.log("nothing")}

export default MicrophoneAccess;