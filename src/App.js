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
			audioURL: null
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURL = this.getRecordedAudioURL.bind(this);
	}
  
	// callback function for getting the stream of MicrophoneAccess component
	getStreamData(streamData) {
		this.setState({stream: streamData})
	} 
	// callback function for getting the audioURL of Recorder component
	getRecordedAudioURL(audioURL) {
		this.setState({audioURL: audioURL})
	}

  render() {
  	// console.log("render App" + this.state.audio)
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
						<MicrophoneAccess getStreamData={this.getStreamData}/>
						{this.state.stream && <Recorder stream={this.state.stream} 
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
// - Change condition in MicrophoneAccess
// - Toggle Mute/Apply Mute
// - Clean Up console.logs
