/**
 * @file Form Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {CLASS_PREFIX, LAYOUT} from '../util/config'
import FormGroup from './Group'

import './index.css'

/**
 * 表单组件
 *
 * @export
 * @class Form
 * @extends {Component}
 */
export default class Form extends Component {
  static ctrlName = 'Form'

  /**
   *
   * 组件接受并使用的 props 定义
   *
   * @static
   * @memberof Form
   *
   * @property {string} [layout=config.LAYOUT.HORIZONTAL] 布局
   * @property {string} [className] 从外部指定的自定义样式类名
   * @property {React.CSSProperties} [style] 从外部指定的自定义样式
   * @property {function(formValue: Object)} [onSubmit] 提交事件响应句柄
   */
  static propTypes = {
    layout: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onSubmit: PropTypes.func
  }

  /**
   * 构造函数
   *
   * @param {any} props
   */
  constructor (props) {
    super(props)
    this.controls = {}
  }

  /**
   * 处理提交
   *
   * @private
   *
   * @param {Event} e 事件参数
   */
  handleSubmit = e => {
    e.preventDefault()
    const {onSubmit} = this.props
    this.validate().then(() => {
      onSubmit && onSubmit(this.getValue())
    }).catch(() => {})
  }

  /**
   * 获取被劫持处理后的子级组件们，用于渲染
   *
   * @private
   *
   * @param {React.Children} children
   *
   * @returns {React.Children}
   */
  getHijackedChildren (children) {
    return React.Children.map(children, el => {
      if (React.isValidElement(el)) {
        if (el.type.IS_ZHUI_FORM_CONTROL) {
          const id = el.props.id
          return React.cloneElement(el, {
            ...el.props,
            ref: refEl => (this.controls[id] = refEl)
          }, this.getHijackedChildren(el.props.children))
        }
        return React.cloneElement(el, el.props, this.getHijackedChildren(el.props.children))
      }
      return el
    })
  }

  /**
   * 获取指定 id 的控件的当前取值
   *
   * @param {string} id
   */
  getControlValue (id) {
    return this.controls[id] && this.controls[id].getValue()
  }

  getValue () {
    let value = {}
    for (let k in this.controls) {
      value[k] = this.controls[k].getValue()
    }
    return value
  }

  setValue (v) {
    for (let k in v) {
      this.controls[k] && this.controls[k].setValue(v[k])
    }
  }

  clearValue () {
    for (let k in this.controls) {
      this.controls[k].clearValue()
    }
  }

  resetValue () {
    for (let k in this.controls) {
      this.controls[k].resetValue()
    }
  }

  showMessage (msg = {}) {
    if (typeof msg === 'object') {
      for (let k in msg) {
        this.controls[k] && this.controls[k].showMessage(msg[k])
      }
    }
  }

  /**
   * 整体校验
   *
   * @returns {Promise}
   */
  validate () {
    let controls = Object.values(this.controls)
    return Promise.all(controls.map(ctrl => ctrl.validate())).catch(e => {
      let ctrl = controls.find(c => c.props.id === e.id)
      ctrl && ctrl.scrollToShow()
      throw e
    })
  }

  /**
   * 渲染
   */
  render () {
    const {
      layout = LAYOUT.HORIZONTAL,
      className,
      style,
      children
    } = this.props

    this.controls = {}

    const classes = cx(
      `${CLASS_PREFIX}Form`,  // 整体样式
      `${CLASS_PREFIX}${LAYOUT[layout.toUpperCase()] || LAYOUT.HORIZONTAL}`,  // 布局控制
      className  // 外部样式
    )

    return (
      <form
        className={classes}
        style={style}
        onSubmit={this.handleSubmit}
      >
        {this.getHijackedChildren(children)}
      </form>
    )
  }
}

Form.Group = FormGroup
export const Group = FormGroup
