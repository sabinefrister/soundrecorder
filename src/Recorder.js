import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = { 
			audioData: new Uint16Array(0),
			// mute: null
		};

		this.recordAudio = this.recordAudio.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		// this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.source = this.audioContext.createMediaStreamSource(this.props.stream);
    // Connect different audio modules/audio graph nodes together
    // Setting up gain
		this.gainNode = this.audioContext.createGain();
		this.initialVol = 0.75;
		this.gainNode.gain.value = this.initialVol;
		this.source.connect(this.gainNode);
		this.gainNode.connect(this.audioContext.destination)

		// Creating a mediaRecorder
		this.mediaRecorder = new MediaRecorder(this.props.stream);
    // dataArray???
  }

   componentWillUnmount() {
    this.source.disconnect();
  }

  recordAudio() {
  	this.mediaRecorder.start();
		console.log(this.mediaRecorder.state);
  	console.log("record started")
  }

  stopRecording() {
  	this.mediaRecorder.stop();
		console.log(this.mediaRecorder.state);
  	console.log("record stopped")
  }

  // toggleMute() {
		// if(mute.id == null) {
		// 	setMute();
		// } else {
		// 	setUnmute();
		// };
  // }

  render() {
    return (
			<React.Fragment>
				<div>
					<Button id="record" onClick={this.recordAudio}>Record</Button>
					<Button id="stop" onClick={this.stopRecording}>Stop</Button>
					<Button id="mute"onClick={this.toggleMute}>Mute</Button>
				</div>
      </React.Fragment>
    );
  }
}

export default Recorder;

