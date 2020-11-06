import React, { Component } from 'react';


class AudioPlayer extends Component {
  constructor(props) {
    super(props);
		this.state = {}
		};

	render() {
    return (
			<div>
				<h3">{this.props.fileName}</h3>
				<audio controls 
					src={this.props.audioURL}
				/>
			</div>
    );
  }
}

export default AudioPlayer;
