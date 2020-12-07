import React, { Component } from 'react';
import { Navbar, Container, Jumbotron, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import DownloadButton from './DownloadButton';
import NewRecordingButton from './NewRecordingButton';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			audioURL: null,
			streamAvailable: false,
			fileName: null,
			showAlert: false,
			alertMessage: ""
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURLAndFileName = this.getRecordedAudioURLAndFileName.bind(this);
		this.getErrorFromRecorder = this.getErrorFromRecorder.bind(this);
		this.getErrorDueToMediaRecorder = this.getErrorDueToMediaRecorder.bind(this);
		this.setNewRecording = this.setNewRecording.bind(this);
	}
  
	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		if (streamData === "error") {
			let microphoneAccessAlert = "It wasn't possible to access your microphone. Please reload this page and start again."
			this.setState({showAlert: true, alertMessage: microphoneAccessAlert})
		} else {
			this.setState({stream: streamData, streamAvailable: true})
		}
	} 
	// callback function for getting the audioURL and fileName of recorded clip from Recorder component
	getRecordedAudioURLAndFileName(audioURL, fileName) {
		this.setState({audioURL: audioURL, fileName: fileName})
	}

	getErrorFromRecorder(error) {
		let recorderAlert = `It wasn't possible to start a recording. ${error}`
		this.setState({showAlert: true, alertMessage: recorderAlert})
	}

	getErrorDueToMediaRecorder(error) {
		let mediaRecorderAlert = `The sound recorder is not supported by Safari and Internet Explorer. Please use another Browser. ${error}`
		this.setState({showAlert: true, alertMessage: mediaRecorderAlert, streamAvailable: false})
	}

	setNewRecording() {
		this.setState({audioURL: null, fileName: null})
	}

  render() {
  	return (
  		<React.Fragment>
			  <Navbar variant="dark">
			    <Navbar.Brand>
			    	<FontAwesomeIcon icon={faMicrophone}  className="d-inline-block align-top"/>
			    	{' '}Record your voice
			    </Navbar.Brand>
			  </Navbar>
			  <Alert variant="danger" show={this.state.showAlert}>
			  	{this.state.alertMessage}
		  	</Alert>
				<Container className="main-container">
				  <h1>Record audio and Download it to your computer</h1>
				  <p>
				    You can record anything you like with this simple sound recorder.
				    After naming your file, you can download it to your computer.
				  </p>
				  <Jumbotron>
						{!this.state.streamAvailable && (
							<Row>
								<Col className="recorder">
									<MicrophoneAccess 
										getStreamData={this.getStreamData} 					 
									/>
								</Col>
							</Row>
						)}
						{this.state.streamAvailable && !this.state.fileName && (
							<Row>
								<Col>
									<Recorder 
										stream={this.state.stream} 
										getRecordedAudioURLAndFileName={this.getRecordedAudioURLAndFileName}
										getErrorFromRecorder={this.getErrorFromRecorder}
										getErrorDueToMediaRecorder={this.getErrorDueToMediaRecorder}
									/>
								</Col>
							</Row>
						)}
						{this.state.audioURL && (
							<Row>
								<Col className="player">
									<div className="Player">
										<AudioPlayer audioURL={this.state.audioURL} fileName={this.state.fileName} />
										<DownloadButton audioURL={this.state.audioURL} fileName={this.state.fileName} />
										<NewRecordingButton setNewRecording={this.setNewRecording}/>
									</div>
								</Col>
							</Row>
						)}
					</Jumbotron>
		    </Container>
	    </React.Fragment>
  	)
  }
};

export default App;
