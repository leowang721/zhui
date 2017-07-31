/**
 * @file 行内修改模式的 Input
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import Input from './'
import Button from '../Button'

import './InlineEdit.css'

@connectControl
export default class InputInlineEdit extends Component {
  static ctrlName = 'InlineEdit'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control
   *
   * @property {function} [onChange] 同步值变化的句柄，透传自 Control
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    // 事件
    onChange: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      editing: false
    }
  }

  goEdit = () => {
    this.setState({
      editing: true,
      originalValue: this.props.value
    })
  }

  cancelEdit = () => {
    const {onChange} = this.props
    this.setState({editing: false})
    if (this.state.originalValue !== this.props.value) {
      onChange(this.state.originalValue)
    }
  }

  save = () => {
    this.setState({
      editing: false
    })
  }

  getClassName (part, state) {
    return getControlPartClassName('InputInlineEdit', part, state)
  }

  render () {
    const {id, value, disabled, ...restProps} = this.props
    return (
      <div className={this.getClassName('container')}>
        {
          !disabled && this.state.editing ? (
            <div className={this.getClassName('form')}>
              <Input id={`${id}-form`} value={value} {...restProps} autoFocus />
              <Button id={`${id}-save`} onClick={this.save}>保存</Button>
              <Button id={`${id}-cancel`} skin='link' onClick={this.cancelEdit}>取消</Button>
            </div>
          ) : (
            <div className={this.getClassName('info')} title='点击修改' onClick={this.goEdit} autoFocus disabled={disabled}>
              {value}
            </div>
          )
        }
      </div>
    )
  }
}
