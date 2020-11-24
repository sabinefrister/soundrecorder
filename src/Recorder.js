import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Timer from './Timer';
import PropTypes from 'prop-types'


class Recorder extends Component {
  constructor(props) {
    super(props);
		this.state = {
			timerStarted: false,
			idRecordButton: "",
			enableRecordButton: true,
			enableStopButton: true,
		};

		this.startRecording = this.startRecording.bind(this);
		this.stopRecording = this.stopRecording.bind(this);
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
	  	this.props.getRecordedAudioURLAndFileName(audioURL, `${fileName}.wav`);
		}.bind(this);

		this.mediaRecorder.ondataavailable = function(event) {
			chunks.push(event.data);
		}
  }

  componentWillUnmount() {
    this.source.disconnect();
  }

  startRecording() {
  	this.setState({timerStarted: true})
		this.setState({idRecordButton: "record"})
		this.setState({enableStopButton: true, enableRecordButton: false})
  	this.mediaRecorder.start();
  }

  stopRecording() {
  	this.mediaRecorder.stop();
  	this.setState({timerStarted: false})
  	this.setState({idRecordButton: ""});
		this.setState({enableStopButton: false, enableRecordButton: true})
  }  

  render() {
    return (
			<div className="recorder">
				<Timer timerStarted={this.state.timerStarted} />
				<Button size="lg" 
								className="recordButton"
								id={this.state.idRecordButton} 
								onClick={this.startRecording}
								disabled={!this.state.enableRecordButton}>
								Record
				</Button>
				<Button size="lg" 
								className="stopButton"
								id="stop" 
								onClick={this.stopRecording}
								disabled={!this.state.enableStopButton}>
								Stop
				</Button>
			</div>
    );
  }
}

export default Recorder;


Recorder.propTypes = {
  stream: PropTypes.object.isRequired,
  getRecordedAudioURLAndFileName: PropTypes.func.isRequired
};
