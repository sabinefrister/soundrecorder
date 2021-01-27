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
		this.handleMediaRecorderStop = this.handleMediaRecorderStop.bind(this);
		this.handleMediaRecorderDataAvailable = this.handleMediaRecorderDataAvailable.bind(this);
		this.handleMediaRecorderError = this.handleMediaRecorderError.bind(this);
  }

  componentDidMount() {
    let audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.source = audioContext.createMediaStreamSource(this.props.stream);
    
    // Connect different audio modules/audio graph nodes together
    // Setting up gain
		let gainNode = audioContext.createGain();
		let initialVol = 0.75;
		gainNode.gain.value = initialVol;
		this.source.connect(gainNode);

		try {
			// Creating a mediaRecorder
			this.mediaRecorder = new MediaRecorder(this.props.stream);
		} catch (error) {
			// catch error if Media Recorder API is not supported
			this.props.getErrorDueToMediaRecorder(error)
			return;
		}
		
		// setting up recorded audio snippets
		this.chunks = [];
		this.mediaRecorder.onstop = this.handleMediaRecorderStop;
		this.mediaRecorder.ondataavailable = this.handleMediaRecorderDataAvailable;
		this.mediaRecorder.onError = this.handleMediaRecorderError;
  }

  handleMediaRecorderStop(event) {
  	var fileName = prompt("Please enter a name for your sound clip.", 
				"Audio 1")
		if (fileName === null) {
			fileName = "Audio 1"
		}
  	var blob = new Blob(this.chunks, {'type' : 'audio/mp4'});
  	// reset chunks for a new file 
  	this.chunks = [];
  	var audioURL = URL.createObjectURL(blob);
  	this.props.getRecordedAudioURLAndFileName(audioURL, `${fileName}.mp4`);
  }

  handleMediaRecorderDataAvailable(event) {
  	this.chunks.push(event.data);
  }

  handleMediaRecorderError(event) {
  	this.props.getErrorFromRecorder(event.error.name);
  }

  componentWillUnmount() {
    this.source.disconnect();
  }

  startRecording() {
  	this.setState({
  		timerStarted: true, 
  		idRecordButton: "record", 
  		enableStopButton: true, 
  		enableRecordButton: false
  	})
  	this.mediaRecorder.start();
  }

  stopRecording() {
  	if (this.state.timerStarted) {
	  	this.mediaRecorder.stop();
	  	this.setState({
	  		timerStarted: false, 
	  		idRecordButton: "",
	  		enableStopButton: false, 
	  		enableRecordButton: true
	  	})
  	}
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
