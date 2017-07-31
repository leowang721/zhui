/**
 * @file FormGroup 组件，用于对表单元素做分组布局管理
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {CLASS_PREFIX, LAYOUT} from '../util/config'

import './Group.css'

/**
 * FormGroup 组件，用于对表单元素做分组布局管理
 *
 * @export
 * @class Form.Group
 * @extends {Component}
 */
export default class FormGroup extends Component {
  static ctrlName = 'FormGroup'

  /**
   * 组件支持传入的 props 定义
   *
   * @static
   *
   * @property {string} [layout=config.LAYOUT.HORIZONTAL] 布局
   * @property {string} [title] 可选的配置，组标题
   * @property {string} [className] 从外部指定的自定义样式类名
   * @property {React.CSSProperties} [style] 从外部指定的自定义样式
   */
  static propTypes = {
    layout: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    // Component 属性
    className: PropTypes.string,
    style: PropTypes.object
  }

  /**
   * 默认的 props
   *
   * @static
   */
  static defaultProps = {
    layout: LAYOUT.HORIZONTAL
  }

  /**
   * 渲染组描述
   */
  renderTitle () {
    const {title} = this.props

    return (
      <div className={`${CLASS_PREFIX}FormGroup-title`}>
        {title}
      </div>
    )
  }

  /**
   * 渲染子级控件
   */
  renderChildren () {
    const {layout, children} = this.props

    const classes = cx(
      `${CLASS_PREFIX}FormGroup-content`,  // 整体样式
      `${CLASS_PREFIX}${LAYOUT[layout.toUpperCase()] || LAYOUT.HORIZONTAL}`  // 布局控制
    )

    return (
      <div className={classes}>
        {children}
      </div>
    )
  }

  /**
   * 渲染
   */
  render () {
    const {
      title,
      label,
      className,
      style
    } = this.props

    const classes = cx(
      `${CLASS_PREFIX}FormGroup`,  // 整体样式
      className  // 外部样式
    )

    return (
      <div
        className={classes}
        style={style}
      >
        {title && this.renderTitle()}
        {label && (<div className={`${CLASS_PREFIX}FormCtrl-label`}>{label}</div>)}
        {this.renderChildren()}
      </div>
    )
  }
}
