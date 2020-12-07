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
		this.displayDuration = this.displayDuration.bind(this)
	};

	displayDuration(elapsedTime) {
		let duration = Math.floor(elapsedTime/1000)
		let seconds = duration % 60;
		let minutes = Math.floor(duration/60) % 60
		let hours = Math.floor(duration/60/60)

		// add zero if single digit
		if (seconds.toString().length === 1) {
			seconds = `0${seconds}`
		}
		if (minutes.toString().length === 1) {
			minutes = `0${minutes}`
		}
		if (hours.toString().length === 1) {
			hours = `0${hours}`
		}
		return `${hours}:${minutes}:${seconds}`
	}

	refreshTimer() {
		let dateNow = new Date()
		let elapsedTime = dateNow - this.state.dateStart;
		let duration = this.displayDuration(elapsedTime)
		this.setState({duration: duration});
	}

	componentDidUpdate() {
		if (this.props.timerStarted && this.state.dateStart === null) {
			let dateStart = new Date()
			this.setState({dateStart: dateStart})
			this.timerID = setInterval(
	      () => this.refreshTimer(),
	      500
	    )
		}
	}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	render() {
    return (
    	<div className="timer">
				<div>
					{this.state.duration ? this.state.duration : "00:00:00"}
				</div>
			</div>
    );
  }
}

export default Timer;


Timer.propTypes = {
	timerStarted: PropTypes.bool.isRequired,
};
