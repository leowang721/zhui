/**
 * @file Button Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import omit from 'lodash.omit'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import ButtonGroup from './Group'

import './index.css'

/**
 * 按钮组件
 *
 * @export
 * @class Button
 * @extends {Component}
 */
@connectControl
export default class Button extends Component {
  static ctrlName = 'Button'

  /**
   * 组件支持传入的 props 定义，继承了 {@link Form.Control#propTypes} 指定的会传入真实控件的 props，故在此只介绍私有的 props
   *
   * @property {string} id 命名，透传自 Control
   * @property {string} [type='button'] 类型，可选值同 html button 的 type 取值： button | submit | reset | menu（暂未实现）
   * @property {string} [skin] 皮肤种类
   * @property {function(e:Event)} [onClick] 点击事件句柄
   */
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    skin: PropTypes.string,
    onClick: PropTypes.func
  }

  /**
   * 默认的 props
   *
   * @static
   * @memberof Button
   */
  static defaultProps = {
    type: 'button',
    onClick (e) {}
  }

  /**
   * 点击行为处理
   *
   * @memberof Button
   *
   * @param {React.MouseEvent} e 事件参数
   */
  handleClick = e => {
    const {onClick} = this.props
    onClick(e)
  }

  render () {
    const {
      id,
      children,
      skin,
      ...restProps
    } = this.props

    const passThroughProps = omit(restProps, ['onClick', 'onChange', 'showMessage'])

    return (
      <button
        {...passThroughProps}
        id={id}
        name={id}  // name 与 id 相同
        onClick={this.handleClick}
      >
        {children}
      </button>
    )
  }
}

Button.Group = ButtonGroup
export const Group = ButtonGroup
