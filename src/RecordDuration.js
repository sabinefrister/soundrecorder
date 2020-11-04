import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


class RecordDuration extends Component {
  constructor(props) {
    super(props);
		this.state = {
			time: new Date(),
			timerStarted: false,
			// dateStart: "00:00:00",
			// time: "00:00:00",
		}
		this.startTimer = this.startTimer.bind(this)
		// this.refreshTimer = this.refreshTimer.bind(this)
		};

	refreshTimer() {
		this.setState({time: new Date()});  
	}

	startTimer() {
		this.setState({time: new Date(), timerStarted: true})
	}

	// refreshTimer() {
	// 	let dateNow = new Date()
	// 	console.log(dateNow + "now")
	// 	let duration = dateNow.getTime() - this.state.dateStart.getTime();
	// 	this.setState({time: duration})
	// }

	componentDidMount() {
		if (this.state.timerStarted) {
			this.timerID = setInterval(
	      () => this.refreshTimer(),
	      1000
	    );
		}

	}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	render() {
    return (
			<div>
				<Button onClick={this.startTimer}>Start Timer</Button>
				<span className="recordDuration">{this.state.time.toLocaleTimeString()}</span>
			</div>
    );
  }
}

export default RecordDuration;
