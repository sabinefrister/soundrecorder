import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import AudioPlayer from './AudioPlayer';


class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = {};

		this.recordAudio = this.recordAudio.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.playRecording = this.playRecording.bind(this);
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
		// setting up recorded audio snippets
		var chunks = [];
		this.mediaRecorder.onstop = function(event) {
			console.log("onstop")
			console.log("mediaRecorder: " + this.mediaRecorder);
    	console.log(this.state);

    	var blob = new Blob(chunks, {'type' : 'audio/wave'});
    	chunks = [];
    	var audioURL = URL.createObjectURL(blob);
    	this.props.getRecordedAudioURL(audioURL);
    	console.log(this.state);
		}.bind(this);

		this.mediaRecorder.ondataavailable = function(event) {
			console.log("ondataavailable")
			console.log("mediaRecorder: " + this.mediaRecorder);
			chunks.push(event.data);
			console.log("chunks" + chunks);
			console.log("eventdata" + event.data);
		}
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

  playRecording() {
		console.log(this.mediaRecorder);
  	console.log("play")
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
					<Button id="play" onClick={this.playRecording}>Play</Button>
					<Button id="mute"onClick={this.toggleMute}>Mute</Button>
				</div>
      </React.Fragment>
    );
  }
}

export default Recorder;

