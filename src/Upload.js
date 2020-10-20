import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Upload extends Component {
  constructor(props) {
    super(props);
		this.state = {}
		this.uploadToDropbox = this.uploadToDropbox.bind(this)
	};

	// componentDidMount() {
	// 	let accessToken = ACCESS_TOKEN;
	// 	const dropboxAPI = new Dropbox({  
	// 	  accessToken: accessToken,
	// 	  fetch: window.fetch.bind(window) 
	// 	});

	// 	dropboxAPI.filesListFolder({  
	// 	  path: ''  
	// 	}).then(response => console.log("response" + response))
	// }

	uploadToDropbox() {
		var url = this.props.audioURL;
		var filename = this.props.filename;
		var options = {}
		window.Dropbox.save(url, filename, options);
	}

	render() {
    return (
			<React.Fragment>
				<Button onClick={this.uploadToDropbox}>Upload this audio</Button>
			</React.Fragment>
    );
  }
}

export default Upload;
