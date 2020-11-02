import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap/';

class NewRecordingButton extends Component {
  constructor(props) {
    super(props);
		this.state = {
			show: false,
		}

		this.onOK = this.onOK.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	};

	onOK() {
		this.props.setNewRecording()
		this.handleClose()
	}

	handleClose() {
		this.setState({show: false})
	}

	handleShow() {
		this.setState({show: true})
	}

	render() {
    return (
			<React.Fragment>
				<Button onClick={this.handleShow}>Start a new recording</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							Start a new Recording
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You can start a new recording, but your previous recording will be deleted. 
						Did you save it? If not, please cancel. If yes, press OK.
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Cancel</Button>
						<Button onClick={this.onOK}>Ok</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
    );
  }
}

export default NewRecordingButton;
