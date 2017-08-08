/**
 * @file Select Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import cx from 'classnames'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import SelectOption from './Option'
import Input from '../Input'
import Popup from '../Popup'
import SelectInlineEdit from './InlineEdit'

import './index.css'

/**
 * 下拉选择组件
 *
 * 类似于 html 中的 select
 *
 * @export
 * @class Select
 * @extends {Component}
 */
export class RawSelect extends Component {
  static ctrlName = 'Select'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} id 命名，透传自 Control
   * @property {any} [value] 控件值，透传自 Control
   * @property {bool} [filterMode=false] 是否是快速筛选模式
   *
   * @property {function} [onChange] 同步值变化的句柄，透传自 Control
   * @property {function} [onSelect] 选择某项时的相应句柄
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    filterMode: PropTypes.bool,
    placeholder: PropTypes.string,
    // 事件
    onChange: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    width: 120,
    placeholder: '请选择'
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      inputValue: ''
    }
    this.state.options = this.getOptionsFromProps(props)
    let selected = this.getSelectedOption()
    if (selected) {
      this.state.inputValue = this.getOptionText(selected)
    }
  }

  componentWillReceiveProps (nextProps) {
    let toUpdateState = {
      options: this.getOptionsFromProps(nextProps)
    }

    let selected = this.getOptionByValue(nextProps.value, toUpdateState.options)
    if (selected) {
      toUpdateState.inputValue = this.getOptionText(selected)
    } else {
      toUpdateState.inputValue = ''
    }

    this.setState(toUpdateState)

    if (nextProps.value !== this.props.value) {
      this.props.onChange(nextProps.value)
    }
  }

  getOptionsFromProps (props = this.props, filter = '') {
    let options = []

    const children = React.Children.toArray(props.children)
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (child.type.isSelectOption) {
        let opt = {
          value: child.props.value,
          title: child.props.title || child.props.children,
          text: child.props.children
        }

        options.push(opt)
      }
    }

    // filter
    if (filter) {
      options = options.filter(op => this.getOptionText(op).indexOf(filter) > -1)
    }

    if (options.length === 0) {
      options.push({
        value: '',
        title: '',
        text: this.props.placeholder || '无可选项',
        selected: false,
        disabled: true
      })
    }

    return options
  }

  getSelectedOption (options = this.state.options) {
    const {value} = this.props
    return options.find(op => op.value === value)
  }
  getOptionByValue (value, options = this.state.options) {
    return options.find(op => op.value === value)
  }

  getOptionText (op) {
    if (op) {
      return typeof op.text === 'string' ? op.text : String(op.text)
    }
    return ''
  }

  /**
   * 输入时的事件处理
   *
   * @param {React.KeyEvent} e 事件参数
   */
  handleSelect = value => {
    const {onChange, onSelect} = this.props
    const currOption = this.getOptionByValue(value)
    this.hideOptions()
    onSelect && onSelect(currOption)
    onChange && onChange(value)
  }

  showOptions = () => {
    !this.props.disabled && this.setState({expanded: true})
  }
  hideOptions = () => {
    !this.props.disabled && this.setState({expanded: false})
  }

  getClassName (part, state) {
    return getControlPartClassName('Select', part, state)
  }

  onInputValueChange = v => {
    this.setState({
      inputValue: v,
      options: this.getOptionsFromProps(this.props, v)
    })
  }
  onInputFocus = e => {
    this.setState({
      options: this.getOptionsFromProps(this.props),
      inputValue: this.props.value === '' ? '' : this.state.inputValue
    })
  }
  onInputBlur = e => {
    let currOption = this.getSelectedOption()
    const currOptionText = currOption ? this.getOptionText(currOption) : ''
    this.setState({inputValue: currOptionText})
  }

  getSelectionView () {
    const {id, filterMode, placeholder, disabled} = this.props
    let currentOption = this.getSelectedOption()
    return (
      <div className={this.getClassName('selection')} style={this.getUiStyle()} onClick={this.showOptions} disabled={disabled}>
        {filterMode
          ? <Input id={`${id}-input`} value={this.state.inputValue}
            onChange={this.onInputValueChange}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur}
            width={this.props.width}
            placeholder={placeholder}
            disabled={disabled} />
          : (currentOption ? currentOption.text : placeholder)
        }
        <span className={this.getClassName('arrow')} />
      </div>
    )
  }

  getOptionsView () {
    const {value} = this.props
    return (<ul>
      {this.state.options.map((op, index) => (
        <li className={op.value === value ? this.getClassName('options', 'selected') : ''} title={op.title} key={index}
          onClick={() => { this.handleSelect(op.value) }}>
          {op.text}
        </li>
      ))}
    </ul>)
  }

  getUiStyle () {
    let style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    return style
  }

  render () {
    const {id} = this.props

    const className = cx([
      this.getClassName('container'),
      this.state.expanded ? this.getClassName('container', 'expanded') : ''
    ])
    return (
      <div id={id} className={className} ref={(dom) => { this.selectionDom = dom }}>
        {this.getSelectionView()}
        <Popup visible={this.state.expanded} alignElement={this.selectionDom} alignPosition='bl' onHide={this.hideOptions}>
          <div className={this.getClassName('options')} style={this.getUiStyle()}>
            {this.getOptionsView()}
          </div>
        </Popup>
      </div>
    )
  }
}

const Select = connectControl(RawSelect)
Select.Option = SelectOption
Select.InlineEdit = SelectInlineEdit
export const Option = SelectOption
export const InlineEdit = SelectInlineEdit

export default Select
