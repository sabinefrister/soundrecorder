import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = {
			recordedClipIndex: 1,
			onRecord: null,
			idRecordButton: "",
		};

		this.recordAudio = this.recordAudio.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.toggleId = this.toggleId.bind(this);
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
			var fileName = prompt("Please enter a name for your sound clip.", 
				`Audio ${this.state.recordedClipIndex}`)

	  	var blob = new Blob(chunks, {'type' : 'audio/wave'});
	  	// reset chunks for a new file 
	  	chunks = [];
	  	var audioURL = URL.createObjectURL(blob);
	  	this.props.getRecordedAudioURLAndFileName(audioURL, fileName);
		}.bind(this);

		this.mediaRecorder.ondataavailable = function(event) {
			chunks.push(event.data);
		}
  }

  componentWillUnmount() {
    this.source.disconnect();
  }

  recordAudio() {
  	this.mediaRecorder.start();
  	this.setState({onRecord: true})
  	this.toggleId()
  }

  stopRecording() {
  	this.mediaRecorder.stop();
  }  

  toggleId() {
  	if (this.state.onRecord) {
  		this.setState({idRecordButton: "record"})
  	}
  	else {
  		this.setState({idRecordButton: ""})
  	}
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
					<Button id={this.state.idRecordButton} onClick={this.recordAudio}>Record</Button>
					<Button id="stop" onClick={this.stopRecording}>Stop</Button>
					<Button id="mute"onClick={this.toggleMute}>Mute</Button>
				</div>
      </React.Fragment>
    );
  }
}

export default Recorder;


// Todo:
// - Make workable: Index of Recordings 
