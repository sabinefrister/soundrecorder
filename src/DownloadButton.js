import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'


class DownloadButton extends Component {
	render() {
    return (
			<React.Fragment>
				<Button size="lg" href={this.props.audioURL} download={this.props.fileName}>Download this audio</Button>
			</React.Fragment>
    );
  }
}

export default DownloadButton;


DownloadButton.propTypes = {
	fileName: PropTypes.string.isRequired,
	audioURL: PropTypes.string.isRequired
};
