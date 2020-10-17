import React, { Component } from 'react';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
		this.state = {}
		};

	render() {
    return (
			<div>
				<h4>{this.props.fileName}</h4>
				<audio controls src={this.props.audioURL}></audio>
			</div>
    );
  }
}

export default AudioPlayer;