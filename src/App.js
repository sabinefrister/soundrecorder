import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import Download from './Download';
import Upload from './Upload';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			data: null,
			stream: null,
			audioURL: null,
			streamAvailable: null,
			fileName: null
		};
		this.getStreamData = this.getStreamData.bind(this);
		this.getRecordedAudioURLAndFileName = this.getRecordedAudioURLAndFileName.bind(this);
		this.stopMicrophoneAccess = this.stopMicrophoneAccess.bind(this);
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
						<h4><FontAwesomeIcon icon={faMicrophone} />Record your voice</h4>
						{this.state.streamAvailable && <Recorder stream={this.state.stream} 
																						getRecordedAudioURLAndFileName={this.getRecordedAudioURLAndFileName}/> }
						{this.state.audioURL && (
							<div className="Player">
								<AudioPlayer audioURL={this.state.audioURL} fileName={this.state.fileName} />
								<Download audioURL={this.state.audioURL} fileName={this.state.fileName} />
								<Upload />
							</div>
						)}		
				</Container>
	    </div>
  	)
  }
};

export default App;

// Todo: 
// - Add Styling
// - Add Upload function to Dropbox
// - Apply more than one audios to be shown (recordedClipIndex: 1,)
// - Try all states to change from null to false
