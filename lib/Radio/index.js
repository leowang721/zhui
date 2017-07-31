/**
 * @file Radio Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import RadioOption from './Option'

import './index.css'

/**
 * 单选组件
 *
 * 类似于 html5 中的 input[type=radio]
 *
 * @export
 * @class Input
 * @extends {Component}
 */
@connectControl
export default class Radio extends Component {
  static ctrlName = 'Radio'

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

  constructor (props) {
    super(props)

    this.adjustOptions(props)
  }

  componentWillReceiveProps (nextProps) {
    this.adjustOptions(nextProps)
  }

  componentWillMount () {
    this.adjustValue()
  }

  adjustOptions (props = this.props) {
    const options = []
    const children = React.Children.toArray(props.children)

    // 检查一下 props.value 是否跟当前的 children 相符，因为 children 可以通过 checked 配置选中
    // 如果指定了 value，又配置了 checked，那么以 value 为准
    // 如果未指定 value，则需要整理出一个 value，在 willMount 阶段与 control 同步
    const currValue = props.value
    let newValue = ''

    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (child.type.isRadioOption) {
        const opt = {
          value: child.props.value,
          title: child.props.title || child.props.children,
          text: child.props.children,
          disabled: !!child.props.disabled,
          checked: !!child.props.checked
        }

        if (currValue !== '') {
          opt.checked = currValue === opt.value
        } else {
          if (opt.checked) {
            if (newValue === '') {
              newValue = opt.value
            } else {
              opt.checked = false
            }
          }
        }

        options.push(opt)
      }
    }
    this.options = options
    this.value = currValue === '' ? newValue : currValue
  }

  adjustValue () {
    if (this.value !== this.props.value) {
      this.props.onChange(this.value)
    }
  }

  /**
   * 修改时的事件处理
   *
   * @param {React.KeyEvent} e 事件参数
   */
  handleChange = newValue => {
    const {onChange} = this.props
    // sync value
    onChange && onChange(newValue)
  }

  renderOptions () {
    const {id, disabled} = this.props
    return this.options.map(op => {
      return (
        <li title={op.title} key={op.value} disabled={disabled || op.disabled}>
          <label>
            <input type='radio' name={id} onChange={() => { this.handleChange(op.value) }}
              checked={op.checked}
              disabled={disabled || op.disabled} />
            <span>{op.text}</span>
          </label>
        </li>
      )
    })
  }

  render () {
    return (
      <ul className={getControlPartClassName('Radio', 'options')}>
        {this.renderOptions()}
      </ul>
    )
  }
}

Radio.Option = RadioOption
export const Option = RadioOption
