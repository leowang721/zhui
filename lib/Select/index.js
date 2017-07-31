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
@connectControl
export default class Select extends Component {
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
    // 事件
    onChange: PropTypes.func,
    onSelect: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      inputValue: ''
    }
    this.state.options = this.getOptionsFromProps(props)
    let selected = this.getSelectedOption(this.state.options)
    if (selected) {
      this.state.inputValue = this.getOptionText(selected)
    }
  }

  componentWillReceiveProps (nextProps) {
    let toUpdateState = {
      options: this.getOptionsFromProps(nextProps)
    }
    let selected = this.getSelectedOption(toUpdateState.options)
    toUpdateState.inputValue = this.getOptionText(selected)

    this.setState(toUpdateState)
  }

  componentWillMount () {
    let selected = this.getSelectedOption()
    // 这个 '' 判断 是用来处理无可选项时默认塞的那个值，不能作为修改凭证
    if (selected.value !== '' && selected.value !== this.props.value) {
      this.setState({
        inputValue: this.getOptionText(selected)
      })
      this.props.onChange(selected.value)
    }
  }

  getOptionsFromProps (props = this.props, filter = '') {
    let options = []

    // 检查一下 props.value 是否跟当前的 children 相符，因为 children 可以通过 selected 配置选中
    // 如果指定了 value，又配置了 selected，那么以 value 为准
    // 如果未指定 value，则需要整理出一个 value，在 willMount 阶段与 control 同步
    let currValue = props.value
    let newValue = ''

    const children = React.Children.toArray(props.children)
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (child.type.isSelectOption) {
        let opt = {
          value: child.props.value,
          title: child.props.title || child.props.children,
          text: child.props.children,
          selected: !!child.props.selected
        }

        if (currValue !== '') {
          opt.selected = currValue === opt.value
        } else {
          if (opt.selected) {
            if (newValue === '') {
              newValue = opt.value
            } else {
              opt.selected = false
            }
          }
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
        text: '无可选项',
        selected: false,
        disabled: true
      })
    }

    // 如果还没有，那么就使用第一个
    if (currValue === '' && newValue === '') {
      // newValue = options[0].value
      options[0].selected = true
    }

    return options
  }

  getValue () {
    let op = this.getSelectedOption()
    return op && op.value
  }

  getOptionByValue (value) {
    return this.state.options.find(op => op.value === value)
  }

  getSelectedOption (options = this.state.options) {
    return options.find(op => op.selected) || options[0]
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
    onSelect && onSelect(currOption)
    onChange && onChange(value)

    // const toUpdateState = {}

    // if (this.props.filterMode) {
    //   toUpdateState.inputValue = this.getOptionText(currOption)
    // }

    this.hideOptions()

    // // sync value
    // this.setState(toUpdateState)
    // onChange && onChange(value)
    // onSelect && onSelect(currOption)
  }

  showOptions = () => {
    !this.props.disabled && this.setState({expanded: true})
  }
  hideOptions = () => {
    !this.props.disabled && this.setState({expanded: false})
  }

  renderOptions () {
    return (<ul>
      {this.state.options.map(op => (
        <li className={op.selected ? this.getClassName('options', 'selected') : ''} title={op.title} key={op.value}
          onClick={() => { this.handleSelect(op.value) }}>
          {op.text}
        </li>
      ))}
    </ul>)
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
      inputValue: this.state.inputValue === '无可选项' ? '' : this.state.inputValue
    })
  }
  onInputBlur = e => {
    let currOption = this.getSelectedOption()
    const currOptionText = currOption ? this.getOptionText(currOption) : ''
    this.setState({inputValue: currOptionText})
  }

  getSelectionView () {
    const {id, filterMode} = this.props
    let currentOption = this.getSelectedOption()
    return (
      <div className={this.getClassName('selection')}>
        {filterMode
          ? <Input id={`${id}-input`} value={this.state.inputValue}
            onChange={this.onInputValueChange}
            onFocus={this.onInputFocus}
            onBlur={this.onInputBlur} />
          : currentOption.text
        }
        <span className={this.getClassName('arrow')} />
      </div>
    )
  }

  render () {
    const {
      id,
      disabled
    } = this.props

    const className = cx([
      this.getClassName('container'),
      this.state.expanded ? this.getClassName('container', 'expanded') : ''
    ])
    return (
      <div id={id} className={className} disabled={disabled}
        onClick={this.showOptions} ref={(dom) => { this.selectionDom = dom }}>
        {this.getSelectionView()}
        <Popup visible={this.state.expanded} alignElement={this.selectionDom} alignPosition='bl' onHide={this.hideOptions}>
          <div className={this.getClassName('options')}>
            {this.renderOptions()}
          </div>
        </Popup>
      </div>
    )
  }
}

Select.Option = SelectOption
Select.InlineEdit = SelectInlineEdit
export const Option = SelectOption
export const InlineEdit = SelectInlineEdit
