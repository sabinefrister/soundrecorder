import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = {
			idRecordButton: "",
			enableRecordButton: true,
			enableStopButton: true,
			muteId: "deactivated",
			nameMuteButton: "Mute",
			idMuteButton: ""
		};

		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
		this.toggleMute = this.toggleMute.bind(this);
		this.setMute = this.setMute.bind(this);
		this.setUnmute = this.setUnmute.bind(this);
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
				"Audio 1")

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

  startRecording() {
		this.setState({idRecordButton: "record"})
		if (this.state.muteId == "deactivated") {
			this.setUnmute()
		} 
		this.setState({enableStopButton: true, enableRecordButton: false})
  	this.mediaRecorder.start();
  }

  stopRecording() {
  	this.mediaRecorder.stop();
  	this.setState({idRecordButton: ""})
		if (this.state.muteId == "activated") {
			this.setUnmute()
		} 
		this.setState({enableStopButton: false, enableRecordButton: true})
  }  

  toggleMute() {
		if(this.state.muteId == "deactivated") {
			this.setMute();
		} else {
			this.setUnmute();
		};
  }

  setMute() {
  	this.gainNode.disconnect(this.audioContext.destination);
		this.setState({muteId: "activated", nameMuteButton: "Unmute", idMuteButton: "mute"});
  }

  setUnmute() {
  	this.gainNode.connect(this.audioContext.destination);
		this.setState({muteId: "deactivated", nameMuteButton: "Mute", idMuteButton: ""});
  }

  render() {
    return (
			<React.Fragment>
				<div>
					<Button id={this.state.idRecordButton} 
									onClick={this.startRecording}
									disabled={!this.state.enableRecordButton}>
									Record
					</Button>
					<Button id="stop" 
									onClick={this.stopRecording}
									disabled={!this.state.enableStopButton}>
									Stop
					</Button>
					<Button id={this.state.idMuteButton} onClick={this.toggleMute}>{this.state.nameMuteButton}</Button>
				</div>
      </React.Fragment>
    );
  }
}

export default Recorder;


// Todo:
// - Make workable: Index of Recordings 

