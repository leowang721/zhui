/**
 * @file ButtonGroup Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'

import './Group.css'

/**
 * ButtonGroup，用于建立一个 Button 组，但实质上还是一堆 Button，仅是样式调整了而已
 *
 * @export
 * @class Button.Group
 * @extends {Component}
 */
@connectControl
export default class ButtonGroup extends Component {
  static ctrlName = 'ButtonGroup'

  /**
   * 组件支持传入的 props 定义
   *
   * @static
   *
   * @property {string} [className] 从外部指定的自定义样式类名
   * @property {React.CSSProperties} [style] 从外部指定的自定义样式
   */
  static propTypes = {
    // Component 属性
    className: PropTypes.string,
    style: PropTypes.object
  }

  /**
   * 渲染
   */
  render () {
    const {
      children
    } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}
