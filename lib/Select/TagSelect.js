import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import Select, {RawSelect} from './'

import './TagSelect.css'

@connectControl
export default class TagSelect extends Component {
  static ctrlName = 'TagSelect'
  firstChange = true

  static propTypes = {
    value: PropTypes.array
  }
  static defaultProps = {
    value: []
  }
  state = {
    selectedValue: ''
  }

  handleExpandSelect = () => {
    this.select.showOptions()
  }

  handleSelectChange = (value) => {
    if (value !== '') {
      this.props.onChange(this.props.value.concat([value]))
    }
  }

  handleRemoveItem = (value) => (e) => {
    e.stopPropagation()
    const finalValue = [...this.props.value]
    finalValue.splice(finalValue.indexOf(value), 1)
    this.props.onChange(finalValue)
  }

  getClassName (part, state) {
    return getControlPartClassName('TagSelect', part, state)
  }

  renderOptions () {
    const {children, value} = this.props
    const finalOptions = Children.map(children, child =>
      value.includes(child.props.value) ? null : child
    )
    if (finalOptions.length) {
      // 如果 select 一定要默认选中第一个，那么这行永远都删不了了
      finalOptions.unshift(<Select.Option key='placeholder' value='' >nyanyanyanya</Select.Option>)
    } else {
      finalOptions.unshift(<Select.Option key='placeholder' value=''>当前没有可选项</Select.Option>)
    }
    return finalOptions
  }

  render () {
    const {value, placeholder} = this.props
    const className = this.getClassName('container')
    return (
      <div className={className} onClick={this.handleExpandSelect}>
        <div className='TagSelect-values'>
          {!value.length && placeholder}
          {value.map(v =>
            <div key={v} className='TagSelect-value'>
              {v}
              <span className='TagSelect-closeIcon' onClick={this.handleRemoveItem(v)}>×</span>
            </div>
          )}
        </div>

        <RawSelect value='nyanyanyanya' onChange={this.handleSelectChange} ref={select => { this.select = select }}>
          {this.renderOptions()}
        </RawSelect>
      </div>
    )
  }
}
