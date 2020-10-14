import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Recorder from './Recorder';

class MicrophoneAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <React.Fragment>
          <Button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone input' : 'Allow microphone input'}
          </Button>
        {this.state.audio ? <Recorder stream={this.state.audio} /> : console.log("nothing")}
      </React.Fragment>
    );
  }
}

export default MicrophoneAccess;