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
  const precision = String(number).split('.')[1]

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
    onChange: PropTypes.func,
    className: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    prefix: PropTypes.string,
    postfix: PropTypes.string,
    width: PropTypes.number
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
    if (nextProps.value !== this.props.value && !this.state.isFocus) {
      this.setState({
        displayValue: this.getDisplayValue(nextProps.value)
      })
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
    this.setValue(addNumber(this.inputDom.value, this.props.step), true)
  }

  handleStepDown = () => {
    this.setValue(addNumber(this.inputDom.value, -this.props.step), true)
  }

  setValue = (value, isSync) => {
    const {onChange, max, min} = this.props

    if (value === '' || value === '-') {
      this.setState({displayValue: value})
      onChange && onChange(undefined)
      return
    }

    const isValid = /^-?\d+\.?\d*$/.test(value)

    if (isValid) {
      let realValue = parseFloat(value)
      // 边界值判断
      if (realValue < min) {
        realValue = min
      } else if (realValue > max) {
        realValue = max
      }

      this.setState({displayValue: isSync ? realValue : value})
      onChange && onChange(realValue)
    }
  }

  getDisplayValue (value = this.props.value) {
    return value === '' ? value : toFixedNumber(value, this.props.precision)
  }

  getClassName (part, state) {
    return getControlPartClassName('InputNumber', part, state)
  }

  getUiStyle () {
    let style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    return style
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
        disabled={disabled}
      >
        <div className={this.getClassName('control')}>
          <span className={this.getClassName('up')} onClick={this.handleStepUp}>^</span>
          <span className={this.getClassName('down')} onClick={this.handleStepDown}>^</span>
        </div>
        {prefix ? <span className={this.getClassName('prefix')}>{prefix}</span> : ''}
        <input
          ref={dom => {
            this.inputDom = dom
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
          style={this.getUiStyle()}
        />
        {postfix ? <span className={this.getClassName('postfix')}>{postfix}</span> : ''}
      </div>
    )
  }
}
