import React, { Component } from 'react';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
		this.state = {}
		};

	render() {
    return (
			<React.Fragment>
				<audio controls src={this.props.audioURL}></audio>
			</React.Fragment>
    );
  }
}

export default AudioPlayer;