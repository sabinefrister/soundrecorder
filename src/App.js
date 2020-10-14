import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import MicrophoneAccess from './MicrophoneAccess';


function App() {
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
					<MicrophoneAccess />
					<h4><FontAwesomeIcon icon={faMicrophone} />Record your voice</h4>
			</Container>
    </div>
  );
}

export default App;
