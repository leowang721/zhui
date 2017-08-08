/**
 * @file InputTextArea Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import omit from 'lodash.omit'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'

import './TextArea.css'

/**
 * 多行输入组件
 *
 * 类似于 html5 中的 textarea
 *
 * @export
 * @class InputTextArea
 * @extends {Component}
 */
@connectControl
export default class InputTextArea extends Component {
  static ctrlName = 'InputTextArea'

  /**
   * 组件支持传入的 props 定义，继承了 {@link Form.Control#propTypes} 指定的会传入真实控件的 props，故在此只介绍私有的 props
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control
   * @property {string} [placeholder] 用于提示用户的输入建议信息，原生 IE 10+
   *
   * @property {function} [onChange] 同步值变化的句柄
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    // 事件
    onChange: PropTypes.func
  }

  /**
   * 默认的 props
   *
   * @static
   * @memberof Input
   */
  static defaultProps = {
    type: 'text',
    width: 500,
    height: 100
  }

  /**
   * 输入时的事件处理
   *
   * @param {React.KeyEvent} e 事件参数
   */
  handleInput = e => {
    const {onChange} = this.props
    // sync value
    onChange && onChange(e.target.value)
  }

  getUiStyle () {
    let style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.height) {
      style.height = this.props.height
    }
    return style
  }

  render () {
    const {
      id,
      value,
      ...restProps
    } = this.props

    const passThroughProps = omit(restProps, ['onChange', 'showMessage'])

    return (
      <textarea
        {...passThroughProps}
        id={id}
        name={id}  // name 与 id 相同
        value={value}
        onChange={this.handleInput}
        style={this.getUiStyle()}
      />
    )
  }
}
