/**
 * @file DatePicker Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import cx from 'classnames'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import Popup from '../Popup'

import './index.css'

/**
 * 日期时间选择组件
 *
 * @export
 * @extends {Component}
 */
@connectControl
export default class DatePicker extends Component {
  static ctrlName = 'DatePicker'

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
      currentDate: this.getValue(),
      availableRange: this.getAvailableRangeFromProps(props)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      currentDate: this.getValue(nextProps),
      availableRange: this.getAvailableRangeFromProps(nextProps)
    })
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

  showOptions = () => {
    !this.props.disabled && this.setState({expanded: true})
  }
  hideOptions = () => {
    !this.props.disabled && this.setState({expanded: false})
  }

  isAvailableDate (date) {
    if (!this.state.availableRange) {
      return true
    }

    if (this.state.availableRange.begin && date.isBefore(this.state.availableRange.begin)) {
      return false
    } else if (this.state.availableRange.end && date.isAfter(this.state.availableRange.end)) {
      return false
    }
    return true
  }

  nextMonth = () => {
    this.setState({currentDate: this.state.currentDate.add(1, 'months')})
  }
  prevMonth = () => {
    this.setState({currentDate: this.state.currentDate.subtract(1, 'months')})
  }
  nextYear = () => {
    this.setState({currentDate: this.state.currentDate.add(1, 'years')})
  }
  prevYear = () => {
    this.setState({currentDate: this.state.currentDate.subtract(1, 'years')})
  }

  getValue (props = this.props) {
    return props.value ? moment(props.value) : moment()
  }

  setValue (value) {
    if (this.isAvailableDate(value)) {
      this.setState({currentDate: value})
      const {onChange} = this.props
      onChange(value)
      this.hideOptions()
    }
  }

  getSelectionView () {
    const {format, plainMode} = this.props
    let toUseValue = this.getValue()
    const onClick = plainMode ? undefined : this.showOptions
    return (
      <div className={this.getClassName('selection')} onClick={onClick}>
        {toUseValue.format(format)}
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
    let currentDate = this.state.currentDate
    return <div className={this.getClassName('calendar')}>
      <div className={this.getClassName('calendarTitle')}>
        <div className={this.getClassName('calendarLeftCtrl')}>
          <span title='上一年' onClick={this.prevYear} /><span title='上一月' onClick={this.prevMonth} />
        </div>
        {currentDate.format('LL')}
        <div className={this.getClassName('calendarRightCtrl')}>
          <span title='下一月' onClick={this.nextMonth} /><span title='下一年' onClick={this.nextYear} />
        </div>
      </div>
      <div className={this.getClassName('calendarContent')}>
        {this.getMonthDateView()}
      </div>
    </div>
  }

  /**
   * 获取指定日期当前月的分日视图，因为要填满，所以会渲染前月或后月的部分日期
   *
   * @param {moment} date
   *
   * @returns {React.Element}
   */
  getMonthDateView (date = this.state.currentDate) {
    // 注意这里的数据准备，清理掉了时间信息，只保留年月日， 使用 startOf 和 endOf
    let today = moment().startOf('day')
    let chosenDate = moment(this.getValue().format('YYYY-MM-DD'))
    let beginDate = date.clone().startOf('month')
    let endDate = date.clone().endOf('month')
    let realBeginDate = beginDate.clone().subtract(beginDate.weekday(), 'days')

    // 准备一下数据

    // 准备 weekday 数据
    let weekdayToUseDate = realBeginDate.clone()
    let weekDayLang = []
    for (let i = 0; i < 7; i++) {
      weekDayLang.push(weekdayToUseDate.format('dd'))
      weekdayToUseDate.add(1, 'days')
    }

    // 准备按周组合的完整 date 数据
    let weekCount = endDate.weeks() - beginDate.weeks() + 1  // 因为都是本周的概念，所以计算数量要加一
    let toRenderData = []
    for (let i = 0; i < weekCount; i++) {
      let week = []
      for (let j = 0; j < 7; j++, realBeginDate.add(1, 'days')) {
        let relativeToChosen = realBeginDate.isSame(chosenDate)
          ? 'chosen'
          : (realBeginDate.isBefore(chosenDate)
            ? 'before'
            : 'after')
        week.push({
          isAvailable: this.isAvailableDate(realBeginDate),
          isCurrentMonth: realBeginDate.isSameOrAfter(beginDate) && realBeginDate.isSameOrBefore(endDate),
          isToday: realBeginDate.isSame(today),
          relativeToChosen: relativeToChosen,
          value: realBeginDate.clone()
        })
      }
      toRenderData.push(week)
    }

    return <div className={this.getClassName('month')}>
      <div className={this.getClassName('weekTitle')}>
        {weekDayLang.map(lang => <span key={lang}>{lang}</span>)}
      </div>
      {
        toRenderData.map((week, index) => {
          return <div className={this.getClassName('week')} key={`week-${index}`}>
            {week.map(day => (
              day.isAvailable ? (
                <span key={day.value.unix()}
                  title={day.isToday ? day.value.calendar() : day.value.format(this.props.format)}
                  className={cx([
                    this.getClassName('date'),
                    day.isCurrentMonth ? this.getClassName('date', 'currentMonth') : '',
                    day.isToday ? this.getClassName('date', 'today') : '',
                    this.getClassName('date', day.relativeToChosen)
                  ])}
                  onClick={() => { this.setValue(day.value) }}>
                  {day.value.date()}
                </span>
              ) : (
                <span key={day.value.unix()}
                  title={day.isToday ? day.value.calendar() : day.value.format(this.props.format)}
                  className={cx([
                    this.getClassName('date'),
                    this.getClassName('date', 'unavailable')
                  ])}>
                  {day.value.date()}
                </span>
               )
            ))}
          </div>
        })
      }
    </div>
  }

  getClassName (part, state) {
    return getControlPartClassName('DatePicker', part, state)
  }

  render () {
    const {id, disabled} = this.props
    return (
      <div
        id={id} disabled={disabled} className={this.getClassName('container')}
        ref={(dom) => { this.selectionDom = dom }}>
        {this.getSelectionView()}
        {this.getOptionsView()}
      </div>
    )
  }
}
