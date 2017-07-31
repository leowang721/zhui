/**
 * @file Input Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import omit from 'lodash.omit'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import InputInlineEdit from './InlineEdit'

import './index.css'

const WHITE_TYPE_LIST = {
  text: 1,
  password: 1,
  email: 1,
  tel: 1,
  url: 1,
  number: 1
}

/**
 * 输入组件
 *
 * 类似于 html5 中的 input，但只取了输入部分，跟据 type 区分
 * 参考了现有浏览器的实现，屏蔽了部分未实现的 type，并标明原生兼容性
 *
 *  - text: 普通文本，默认值。
 *  - password: 密码。Chr:1.0, FF:1.0, IE:2, Opera:1.0, Safari: 1.0
 *  - email email 格式。Chr:5.0, FF:4.0, IE:10, Opera:10.62, Safari:?
 *  - tel 电话格式。Chr:5.0, FF:4.0, IE:10, Opera:11.01, Safari:?
 *  - url url 地址格式。Chr:5.0, FF:4.0, IE:10, Opera:10.62, Safari:?
 *  - number: 数字类型。Chr:11, FF:29.0, IE:10, Opera:10.62, Safari:Yes
 *
 * 组合式的暂未实现，再考虑
 *  - search: 用于输入搜索字符串的单行文本字段。换行会被从输入的值中自动移除。但这个定义在考虑扩展加入触发搜索行为，有无按钮之类的定制
 *  - range: 范围，可使用 min, max, value, step。Chr:5.0, FF:23.0, IE:10, Opera: 11.01, Safari: Yes
 *
 * @export
 * @class Input
 * @extends {Component}
 */
@connectControl
export default class Input extends Component {
  static ctrlName = 'Input'

  /**
   * 组件支持传入的 props 定义，继承了 {@link Form.Control#propTypes} 指定的会传入真实控件的 props，故在此只介绍私有的 props
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control
   * @property {string} [type='Input'] 类型，可选值选自 html input 的 type 取值： text|email|number|password|range|search|tel|url
   * @property {string} [placeholder] 用于提示用户的输入建议信息，原生 IE 10+
   * @property {string} [autoComplete='off'] 是否自动填充，这是浏览器控制的，取值可参考 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input
   * @property {boolean} [autoFocus=false] 是否在加载时自动获得焦点
   * @property {number} [tabIndex] 使用 tab 键切换时的索引值，原生 Safari:?
   *
   * @property {function} [onChange] 同步值变化的句柄
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.bool,
    autoFocus: PropTypes.bool,
    tabIndex: PropTypes.number,
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
    type: 'text'
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

  render () {
    const {
      id,
      type,
      ...restProps
    } = this.props

    const passThroughProps = omit(restProps, ['onChange', 'showMessage'])
    let toUseType = WHITE_TYPE_LIST[type] ? type : 'text'

    return (
      <input
        {...passThroughProps}
        id={id}
        name={id}  // name 与 id 相同
        type={toUseType}
        onChange={this.handleInput}
      />
    )
  }
}

Input.InlineEdit = InputInlineEdit
export const InlineEdit = InputInlineEdit
