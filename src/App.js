import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			data: null,
			stream: null,
			audioURL: null,
			streamAvailable: null,
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURL = this.getRecordedAudioURL.bind(this);
		this.stopMicrophoneAccess = this.stopMicrophoneAccess.bind(this);
	}
  
	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		this.setState({stream: streamData})
		this.setState({streamAvailable: true})
	} 
	// callback function for getting the audioURL of Recorder component
	getRecordedAudioURL(audioURL) {
		this.setState({audioURL: audioURL})
	}

	stopMicrophoneAccess() {
		this.setState({streamAvailable: null})
	}

  render() {
  	return (
  		<div className="App">
				<Jumbotron> 
				  <h1>Record audio and upload to Dropbox</h1>
				  <p>
				    You can record anything you like with this simple sound recorder. After naming your file, 
				    you can upload it to Dropbox.
				  </p>
				</Jumbotron>
				<Container>
						<h2>Recorder</h2>
						<MicrophoneAccess getStreamData={this.getStreamData} 
															stopMicrophoneAccess={this.stopMicrophoneAccess}
															streamAvailable={this.state.streamAvailable}
															stream={this.state.stream} 
						/>
						{this.state.streamAvailable && <Recorder stream={this.state.stream} 
																						getRecordedAudioURL={this.getRecordedAudioURL}/> }
						{this.state.audioURL && <AudioPlayer audioURL={this.state.audioURL} /> }
						<h4><FontAwesomeIcon icon={faMicrophone} />Record your voice</h4>
				</Container>
	    </div>
  	)
  }
};

export default App;

// Todo: 
// - Toggle Mute/Apply Mute
// - Add Download function
// - Add UI to Recorder
// - Add Styling
// - Add Upload function to Dropbox
