// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeElapsedInSeconds: '00',
    timerLimitInMinutes: '25',
    isTimerStarted: false,
    incdec: false,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  decrementTimeElapsedInSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    this.setState({
      timeElapsedInSeconds:
        timeElapsedInSeconds === '00' ? 59 : parseInt(timeElapsedInSeconds) - 1,
    })
  }

  //   decrementTimeElapsedInMinutes = () => {
  //     const {timeElapsedInSeconds} = this.state
  //     this.setState({
  //       timeElapsedInSeconds:
  //         timeElapsedInSeconds === '00' ? 59 : parseInt(timeElapsedInSeconds) - 1,
  //     })
  //   }

  startPauseTimer = () => {
    const {
      // eslint-disable-next-line no-unused-vars
      isTimerStarted,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerStarted) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.decrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prev => ({
      isTimerStarted: !prev.isTimerStarted,
      incdec: true,
    }))
  }

  onDecrementTimer = () => {
    const {isTimerStarted} = this.state
    if (!isTimerStarted) {
      this.setState(prev => ({
        timerLimitInMinutes: prev.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrementTimer = () => {
    const {isTimerStarted} = this.state
    if (!isTimerStarted) {
      this.setState(prev => ({
        timerLimitInMinutes: prev.timerLimitInMinutes + 1,
      }))
    }
  }

  onResetTimer = () => {
    const {isTimerStarted} = this.state
    if (isTimerStarted) {
      this.clearTimerInterval()
      this.setState({
        timeElapsedInSeconds: 0,
        timerLimitInMinutes: 25,
        incdec: false,
        isTimerStarted: false,
      })
    }
  }

  render() {
    const {
      timeElapsedInSeconds,
      timerLimitInMinutes,
      isTimerStarted,
      incdec,
    } = this.state

    const stringifiedMinutes =
      parseInt(timerLimitInMinutes) > 9
        ? timerLimitInMinutes
        : `0${parseInt(timerLimitInMinutes)}`
    const stringifiedSeconds =
      parseInt(timeElapsedInSeconds) > 9
        ? timeElapsedInSeconds
        : `0${parseInt(timeElapsedInSeconds)}`

    console.log(stringifiedSeconds)
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="main-container">
          <div className="timer-bg">
            <div className="circular-bg">
              <h1>
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p>{isTimerStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-controls-main-container">
            <div className="timer-controls-container">
              <div className="star-pause-container">
                {isTimerStarted ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="icon"
                    onClick={this.startPauseTimer}
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png "
                    alt="play icon"
                    className="icon"
                    onClick={this.startPauseTimer}
                  />
                )}
                <button type="button" onClick={this.startPauseTimer}>
                  {isTimerStarted ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                  onClick={this.onResetTimer}
                />
                <button type="button">Reset</button>
              </div>
            </div>
            <p className="indDecTimer-title">Set Timer Limit</p>
            <div className="indDecTimer-container">
              <button
                type="button"
                onClick={this.onDecrementTimer}
                disabled={incdec}
              >
                -
              </button>
              <p className="indDecTimer-container-desc">
                {timerLimitInMinutes}
              </p>
              <button
                type="button"
                onClick={this.onIncrementTimer}
                disabled={incdec}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
