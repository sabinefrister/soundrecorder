import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class DownloadButton extends Component {
  constructor(props) {
    super(props);
		this.state = {}
	};

	render() {
    return (
			<React.Fragment>
				<Button size="lg" href={this.props.audioURL} download={this.props.fileName}>Download this audio</Button>
			</React.Fragment>
    );
  }
}

export default DownloadButton;
