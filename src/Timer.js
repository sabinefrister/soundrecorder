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
		let dateNow = Date.now()
		let elapsedTime = dateNow - this.state.dateStart;
		let duration = new Date()
		duration.setHours(0, 0, Math.floor(elapsedTime/1000))
		this.setState({duration: duration});
	}

	componentDidUpdate() {
		if (this.props.timerStarted && this.state.dateStart === null) {
			this.setState({dateStart: Date.now()})
			this.timerID = setInterval(
	      () => this.refreshTimer(),
	      1000
	    )
		}
	}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

	render() {
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
