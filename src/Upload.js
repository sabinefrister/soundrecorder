import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Upload extends Component {
  constructor(props) {
    super(props);
		this.state = {}
	};

	render() {
    return (
			<React.Fragment>
				<Button>Upload this audio</Button>
			</React.Fragment>
    );
  }
}

export default Upload;
