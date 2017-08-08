/**
 * @file CheckBox Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import CheckBoxOption from './Option'

import './index.css'

/**
 * 复选组件
 *
 * 类似于 html5 中的 input[type=checkbox]
 *
 * @export
 * @class Input
 * @extends {Component}
 */
@connectControl
export default class CheckBox extends Component {
  static ctrlName = 'CheckBox'

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
    const opData = this.getOptionsFormProps(props)
    this.state = {
      options: opData.options,
      checkedItems: opData.checkedItems
    }
  }

  componentWillReceiveProps (nextProps) {
    const opData = this.getOptionsFormProps(nextProps)
    this.setState({
      options: opData.options,
      checkedItems: opData.checkedItems
    })
  }

  componentWillMount () {
    let currentValue = this.getValue()
    let propValue = this.props.value
    if (String(propValue) !== String(currentValue)) {
      this.props.onChange(currentValue)
    }
  }

  getValue () {
    return [...this.state.checkedItems]
  }

  getOptionByValue (v) {
    return this.state.options.find(op => op.value === v)
  }

  getOptionsFormProps (props = this.props) {
    const {value} = props
    const options = []
    const children = React.Children.toArray(props.children)

    // 检查一下 props.value 是否跟当前的 children 相符，因为 children 可以通过 checked 配置选中
    // 如果指定了 value，又配置了 checked，那么以 value 为准
    // 如果未指定 value，则需要整理出一个 value，在 willMount 阶段与 control 同步
    const currValue = new Set([].concat(value === '' ? [] : value))
    let checkedItems = new Set()
    const isValueSetted = currValue.size > 0

    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (child.type.isCheckBoxOption) {
        const opt = {
          value: child.props.value,
          title: child.props.title || child.props.children,
          text: child.props.children,
          disabled: !!child.props.disabled,
          onCheckedChange: child.props.onCheckedChange
        }
        if (isValueSetted && currValue.has(opt.value)) {
          checkedItems.add(opt.value)
        } else if (opt.checked) {
          checkedItems.add(opt.value)
        }

        options.push(opt)
      }
    }

    return {
      options,
      checkedItems
    }
  }

  /**
   * 修改时的事件处理
   *
   * @param {React.KeyEvent} e 事件参数
   */
  handleChange = (itemValue, target) => {
    const checkedItems = new Set([...this.state.checkedItems])
    let isChecked = target.checked
    let op = this.getOptionByValue(itemValue)

    if (isChecked) {
      checkedItems.add(op.value)
    } else {
      checkedItems.delete(op.value)
    }

    op.onCheckedChange && op.onCheckedChange(isChecked)

    const {onChange} = this.props
    // sync value
    onChange && onChange([...checkedItems])
  }

  renderOptions () {
    const {id, disabled} = this.props
    return this.state.options.map(op => {
      return (
        <li title={op.title} key={op.value} disabled={disabled || op.disabled}>
          <label>
            <input type='checkbox' name={id} onChange={e => { this.handleChange(op.value, e.target) }}
              checked={this.state.checkedItems.has(op.value)}
              disabled={disabled || op.disabled} />
            <span>{op.text}</span>
          </label>
        </li>
      )
    })
  }

  render () {
    return (
      <ul className={getControlPartClassName('CheckBox', 'options')}>
        {this.renderOptions()}
      </ul>
    )
  }
}

CheckBox.Option = CheckBoxOption
export const Option = CheckBoxOption
