import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';
import Recorder from './Recorder';
import AudioPlayer from './AudioPlayer';
import Download from './Download';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			stream: null,
			audioURL: null,
			streamAvailable: false,
			fileName: null,
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
				  <h1>Record audio and Download to your computer</h1>
				  <p>
				    You can record anything you like with this simple sound recorder. After naming your file, 
				    you can download it to your computer.
				  </p>
				</Jumbotron>
				<Container>
					<Row>
						<Col className="headline">
							<h1 className="headline"><FontAwesomeIcon icon={faMicrophone} /> Record your voice</h1>
						</Col>
					</Row>
					<Row>
						<Col className="recorder">
							<h2>Recorder</h2>
							<MicrophoneAccess getStreamData={this.getStreamData} 
																stopMicrophoneAccess={this.stopMicrophoneAccess}
																streamAvailable={this.state.streamAvailable}
																stream={this.state.stream} 
							/>
							{this.state.streamAvailable && <Recorder stream={this.state.stream} 
																							getRecordedAudioURLAndFileName={this.getRecordedAudioURLAndFileName}/> }
						</Col>
						<Col className="player">
							<h2>Player</h2>
							{this.state.audioURL && (
								<div className="Player">
									<AudioPlayer audioURL={this.state.audioURL} fileName={this.state.fileName} />
									<Download audioURL={this.state.audioURL} fileName={this.state.fileName} />
								</div>
							)}	
						</Col>
					</Row>
				</Container>
	    </div>
  	)
  }
};

export default App;

// Todo: 
// - Add Styling
// - Kann ich Mute einfach rausschmeißen? - > Destination bindet die Lautsprecher ein. -> Ausgabe über Lautsprecher. Qualtät klingt schrecklich...
// Wenn ich den Ton nicht über die Lautsprecher höre, dann brauche ich ja auch nicht das Mute... Die Ausgabe bräcuhte ich theoretisch nur
// wenn ich was über die Kopfhörer hören will, aber das ist mega verzögert, also nicht nutzbar...