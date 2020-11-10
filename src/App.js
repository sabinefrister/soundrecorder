import React, { Component } from 'react';
import { Navbar, Container, Jumbotron, Row, Col } from 'react-bootstrap';
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
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURLAndFileName = this.getRecordedAudioURLAndFileName.bind(this);
		this.setNewRecording = this.setNewRecording.bind(this);
	}
  
	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		this.setState({stream: streamData})
		this.setState({streamAvailable: true})
	} 
	// callback function for getting the audioURL and fileName of recorded clip from Recorder component
	getRecordedAudioURLAndFileName(audioURL, fileName) {
		this.setState({audioURL: audioURL, fileName: fileName})
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
