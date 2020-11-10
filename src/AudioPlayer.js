import React, { Component } from 'react';
import PropTypes from 'prop-types'


class AudioPlayer extends Component {
	render() {
    return (
			<div>
				<h3>{this.props.fileName}</h3>
				<audio controls 
					src={this.props.audioURL}
				/>
			</div>
    );
  }
}

export default AudioPlayer;


AudioPlayer.propTypes = {
	fileName: PropTypes.string.isRequired,
	audioURL: PropTypes.string.isRequired
};
