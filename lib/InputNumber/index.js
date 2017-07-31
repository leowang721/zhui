import React, {Component} from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'

import './index.css'

const toFixedNumber = function (value, precision) {
  return precision ? Number(value).toFixed(precision) : value
}

const getNumberPrecision = function (number) {
  const precision = number.toString().split('.')[1]

  return precision ? precision.length : 0
}

const addNumber = function (...numberArr) {
  const maxPrecision = Math.max(...numberArr.map(number => getNumberPrecision(number)))
  const times = Math.pow(10, maxPrecision)
  const intArr = numberArr.map(number => ~~(number * times))

  return intArr.reduce((prevResult, item) => (prevResult += item)) / times
}

@connectControl
export default class InputNumber extends Component {
  static ctrlName = 'InputNumber'

  static propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    prefix: PropTypes.string,
    postfix: PropTypes.string
  }

  static defaultProps = {
    step: 1,
    max: Infinity,
    min: -Infinity
  }

  constructor (props) {
    super(props)

    this.state = {
      isFocus: false,
      displayValue: this.getDisplayValue(props.value)
    }
    this.inputDom = null
  }

  componentWillReceiveProps (nextProps) {
    const {isFocus} = this.state
    if (nextProps.value !== this.props.value) {
      const toUpdateState = {
        displayValue: this.getDisplayValue(nextProps.value)
      }
      if (!isFocus) {
        this.setState(toUpdateState)
      }
    }
  }

  handleFocus = () => {
    this.setState({isFocus: true})
  }

  handleBlur = () => {
    this.setState({
      isFocus: false,
      displayValue: this.getDisplayValue()
    })
  }

  handleInput = e => {
    this.setValue(e.target.value)
  }

  handleKeyUp = e => {
    if (e.key === 'ArrowUp') {
      this.handleStepUp()
    } else if (e.key === 'ArrowDown') {
      this.handleStepDown()
    }
  }

  handleStepUp = () => {
    this.setValue(addNumber(this.inputDom.value, this.props.step))
  }

  handleStepDown = () => {
    this.setValue(addNumber(this.inputDom.value, -this.props.step))
  }

  setValue = value => {
    const {onChange, max, min} = this.props
    if (value === '-') {
      this.setState({displayValue: value})
      return
    }

    let isValid = /^-?\d+\.?\d*$/.test(value) || value === ''

    if (isValid) {
      let realValue = parseFloat(value)
      // 边界值判断
      if (realValue < min) {
        realValue = min
      } else if (realValue > max) {
        realValue = max
      } else {
      }

      const toUseValue = isNaN(realValue) ? '' : realValue

      this.setState({displayValue: value})

      onChange && onChange(toUseValue)
    }
  }

  getDisplayValue (value = this.props.value) {
    return value === '' ? value : toFixedNumber(value, this.props.precision)
  }

  getClassName (part, state) {
    return getControlPartClassName('InputNumber', part, state)
  }

  render () {
    const {
      id,
      placeholder,
      className,
      disabled,
      prefix,
      postfix
    } = this.props
    const {isFocus, displayValue} = this.state

    return (
      <div
        className={cx(this.getClassName('wrap'), className, {
          [this.getClassName('active')]: isFocus,
          'disabled': disabled
        })}
      >
        <div className={this.getClassName('control')}>
          <span className={this.getClassName('up')} onClick={this.handleStepUp}>^</span>
          <span className={this.getClassName('down')} onClick={this.handleStepDown}>^</span>
        </div>
        {prefix ? <span className={this.getClassName('prefix')}>{prefix}</span> : ''}
        <input
          ref={inputDom => {
            this.inputDom = inputDom
          }}
          id={id}
          name={id}
          placeholder={placeholder}
          value={displayValue}
          disabled={disabled}
          className={cx([
            this.getClassName('input'),
            prefix ? this.getClassName('input', 'prefix') : ''
          ])}
          onChange={this.handleInput}
          onKeyUp={this.handleKeyUp}
          autoComplete='off'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {postfix ? <span className={this.getClassName('postfix')}>{postfix}</span> : ''}
      </div>
    )
  }
}
