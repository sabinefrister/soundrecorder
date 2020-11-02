import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class MicrophoneAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      microphoneAccess: true,
    };
    this.getMicrophone = this.getMicrophone.bind(this);
    }

  async getMicrophone() {
    this.setState({microphoneAccess: false})
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.props.getStreamData(stream)
  }

  render() {
    return (
      <React.Fragment>
        {this.state.microphoneAccess && (
          <Button onClick={this.getMicrophone}>
            Allow microphone input
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default MicrophoneAccess;
