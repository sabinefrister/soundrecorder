import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Timer extends Component {
  constructor(props) {
    super(props);
		this.state = {
			duration: null,
			dateStart: null,
		}
		this.refreshTimer = this.refreshTimer.bind(this)
		};

	refreshTimer() {
		console.log("refresh Timer")
		let dateNow = Date.now()
		let elapsedTime = dateNow - this.state.dateStart;
		let duration = new Date()
		duration.setHours(0, 0, Math.floor(elapsedTime/1000))
		this.setState({duration: duration});
	}

	componentDidUpdate() {
		console.log("before if")
		if (this.props.timerStarted && this.state.dateStart === null) {
			console.log("after if")
			this.setState({dateStart: Date.now()})
			console.log("after date start")
			this.timerID = setInterval(
	      () => this.refreshTimer(),
	      1000
	    )
	    console.log("after timer ID")
		}
	}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	render() {
		console.log("RENDER: duration " + this.state.duration + " timerstarted " + this.props.timerStarted)
    return (
    	<div className="timer">
				<h3>
					{this.state.duration ? this.state.duration.toLocaleTimeString() : "00:00:00"}
				</h3>
			</div>
    );
  }
}

export default Timer;


Timer.propTypes = {
	timerStarted: PropTypes.bool.isRequired,
};
