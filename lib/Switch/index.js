/**
 * @file Switch Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import cx from 'classnames'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'

import './index.css'

/**
 * Switch 开关组件
 *
 * @export
 * @class Input
 * @extends {Component}
 */
@connectControl
export default class Switch extends Component {
  static ctrlName = 'Switch'

  /**
   * 组件支持传入的 props 定义，继承了 {@link Form.Control#propTypes} 指定的会传入真实控件的 props，故在此只介绍私有的 props
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control
   *
   * @property {function} [onChange] 同步值变化的句柄
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    // 事件
    onChange: PropTypes.func
  }

  getClassName (part, state) {
    return getControlPartClassName('Switch', part, state)
  }

  toggle = () => {
    this.props.onChange(!this.props.value)
  }

  render () {
    const {value} = this.props
    const toUse = !!value

    return (
      <div className={this.getClassName()}>
        <div className={this.getClassName('container')} onClick={this.toggle}>
          <span className={cx([
            this.getClassName('switcher'),
            this.getClassName('switcher', toUse ? 'true' : 'false')
          ])} />
        </div>
      </div>
    )
  }
}
