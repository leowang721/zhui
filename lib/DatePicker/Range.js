/**
 * @file DatePickerRange
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import DatePicker from './'
import Popup from '../Popup'

import './Range.css'

/**
 * 日期时间范围选择组件
 *
 * @export
 * @extends {Component}
 */
@connectControl
export default class DatePickerRange extends Component {
  static ctrlName = 'DatePickerRange'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control，类型为 moment 或 moment 可识别的格式
   * @property {string} [format=YYYY-MM-DD] 日期展现的基本格式，格式同 moment
   * @property {bool} [disabled=false] 是否禁用
   * @property {Object} [availableRange] 设置允许操作的时间范围
   * @property {bool} [plainMode=false] 是否是平铺模式
   * @property {any} [availableRange.begin] 设置允许操作的起始时间，包含此时间
   * @property {any} [availableRange.end] 设置允许操作的结束时间，包含此时间
   *
   * @property {function} [onChange] 同步值变化的句柄，透传自 Control
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    format: PropTypes.string,
    disabled: PropTypes.bool,
    availableRange: PropTypes.object,
    plainMode: PropTypes.bool,
    // 事件
    onChange: PropTypes.func
  }

  static defaultProps = {
    format: 'YYYY-MM-DD'
  }

  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      value: this.getValueFromProps(),
      availableRange: this.getAvailableRangeFromProps()
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: this.getValueFromProps(nextProps),
      availableRange: this.getAvailableRangeFromProps(nextProps)
    })
  }

  getValueFromProps (props = this.props) {
    let toUseValue = [].concat(props.value)
    let v1 = toUseValue[0] ? moment(toUseValue[0]) : moment()
    let v2 = toUseValue[1] ? moment(toUseValue[1]) : moment()

    let begin = moment.min(v1, v2).startOf('day')
    let end = moment.max(v1, v2).startOf('day')

    return {begin, end}
  }

  getAvailableRangeFromProps (props = this.props) {
    if (!props.availableRange) {
      return null
    }

    let availableRange = {}
    let begin = props.availableRange.begin == null ? null : moment(props.availableRange.begin).startOf('day')
    let end = props.availableRange.end == null ? null : moment(props.availableRange.end).endOf('day')
    let setted = false
    if (begin && begin.isValid()) {
      availableRange.begin = begin
      setted = true
    }
    if (end && end.isValid()) {
      availableRange.end = end
      setted = true
    }

    return setted ? availableRange : null
  }

  getValue () {
    return this.state.value
  }

  setValue (value) {
    const {onChange} = this.props
    onChange && onChange([value.begin, value.end])
  }

  setSingleValue (value, position) {
    let newValue = {...this.state.value}
    let toUpdateKey = position === 'l' ? 'begin' : 'end'
    newValue[toUpdateKey] = value
    this.setValue(newValue)
  }

  showOptions = () => {
    !this.props.disabled && this.setState({expanded: true})
  }
  hideOptions = () => {
    !this.props.disabled && this.setState({expanded: false})
  }

  getSelectionView () {
    const {format, plainMode} = this.props
    let toUseValue = this.getValue()
    const onClick = plainMode ? undefined : this.showOptions
    return (
      <div className={this.getClassName('selection')} onClick={onClick}>
        {toUseValue.begin.format(format)}
        <span>~</span>
        {toUseValue.end.format(format)}
        <i className={this.getClassName('icon')} />
      </div>
    )
  }

  getOptionsView () {
    const {plainMode} = this.props
    return plainMode ? (
      <div className={this.getClassName('plain')}>
        {this.getCalendarView()}
      </div>
    ) : (
      <Popup visible={this.state.expanded} alignElement={this.selectionDom} alignPosition='bl' onHide={this.hideOptions}>
        {this.getCalendarView()}
      </Popup>
    )
  }

  getCalendarView () {
    const {id, format, disabled} = this.props
    const {value, availableRange} = this.state

    const leftAvailableRange = {
      end: availableRange && availableRange.end ? moment.min(availableRange.end, value.end) : value.end
    }
    if (availableRange && availableRange.begin) {
      leftAvailableRange.begin = availableRange.begin
    }
    const rightAvailableRange = {
      begin: availableRange && availableRange.begin ? moment.max(availableRange.begin, value.begin) : value.begin
    }
    if (availableRange && availableRange.end) {
      rightAvailableRange.end = availableRange.end
    }

    return (
      <div className={this.getClassName('options')}>
        <DatePicker
          id={`${id}-begin`} plainMode
          value={value.begin}
          className={this.getClassName('leftCalendar')}
          format={format}
          disabled={disabled}
          availableRange={leftAvailableRange}
          onChange={v => this.setSingleValue(v, 'l')} />
        <DatePicker
          id={`${id}-end`} plainMode
          value={value.end}
          className={this.getClassName('rightCalendar')}
          format={format}
          disabled={disabled}
          availableRange={rightAvailableRange}
          onChange={v => this.setSingleValue(v, 'r')} />
      </div>
    )
  }

  getClassName (part, state) {
    return getControlPartClassName('DatePickerRange', part, state)
  }

  render () {
    const {id, disabled} = this.props
    return <div id={id} disabled={disabled} className={this.getClassName('container')}
      ref={(dom) => { this.selectionDom = dom }}>
      {this.getSelectionView()}
      {this.getOptionsView()}
    </div>
  }
}
