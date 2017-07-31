/**
 * @file 行内修改模式的 Select
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import Select from './'
import Button from '../Button'

import './InlineEdit.css'

@connectControl
export default class SelectInlineEdit extends Component {
  static ctrlName = 'SelectInlineEdit'

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
    return getControlPartClassName('SelectInlineEdit', part, state)
  }

  getSelectedOptionText () {
    const children = React.Children.toArray(this.props.children)
    let op = children.find(i => i && i.props.value === this.props.value) || children.find(i => i && i.props.selected)
    if (op) {
      return op.props.text || op.props.children
    }
    return children[0] && (children[0].props.text || children[0].props.children)
  }

  render () {
    const {id, value, disabled, children, ...restProps} = this.props
    return (
      <div className={this.getClassName('container')}>
        {
          !disabled && this.state.editing ? (
            <div className={this.getClassName('form')}>
              <Select id={`${id}-form`} value={value} {...restProps} ref={dom => { this.select = dom }}>
                {children}
              </Select>
              <Button id={`${id}-save`} onClick={this.save}>保存</Button>
              <Button id={`${id}-cancel`} skin='link' onClick={this.cancelEdit}>取消</Button>
            </div>
          ) : (
            <div className={this.getClassName('info')} title='点击修改' onClick={this.goEdit} autoFocus disabled={disabled}>
              {this.getSelectedOptionText()}
            </div>
          )
        }
      </div>
    )
  }
}
