import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Download extends Component {
  constructor(props) {
    super(props);
		this.state = {}
		};

	render() {
    return (
			<React.Fragment>
				<Button><a className="download" href={this.props.audioURL} download>Download this audio</a></Button>
			</React.Fragment>
    );
  }
}

export default Download;
