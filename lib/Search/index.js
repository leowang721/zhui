/**
 * @file Search Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import Input from '../Input'

import './index.css'

/**
 * 搜索框组件
 *
 * @export
 * @class Search
 * @extends {Component}
 */
export default class Search extends Component {
  static ctrlName = 'Search'

  state = {
    query: '',
    focus: false
  }

  /**
   * 组件支持传入的 props 定义
   *
   * @property {any} [value] 控件值，透传自 Control
   *
   * @property {function} [onChange] 同步值变化的句柄，透传自 Control
   */
  static propTypes = {
    width: PropTypes.number,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func
  }

  static defaultProps = {
    placeholder: '',
    onSearch () {}
  }

  setFocus = () => {
    this.setState({focus: true})
  }

  setBlur = () => {
    this.setState({focus: false})
  }

  changeValue = v => {
    this.setState({query: v})
  }

  handleKeyUp = e => {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  search = () => {
    const {onSearch} = this.props
    onSearch(this.state.query)
  }

  getClassName (part, state) {
    return getControlPartClassName('Search', part, state)
  }

  render () {
    const {placeholder, width = 200} = this.props
    let classNames = [this.getClassName()]
    if (this.state.focus) {
      classNames.push(this.getClassName('', 'focus'))
    }
    return (<div className={cx(classNames)}>
      <Input type='text' placeholder={placeholder} className={this.getClassName('input')} width={width}
        onFocus={this.setFocus}
        onBlur={this.setBlur}
        onKeyUp={this.handleKeyUp}
        onChange={this.changeValue} />
      <span className={this.getClassName('button')} onClick={this.search}>🔍</span>
    </div>)
  }
}
