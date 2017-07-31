/**
 * @file Example Simple Container
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Input} from 'zhui'

import formActions from '../../actions/form'

import './Input.css'

@connect(
  state => ({
    isRelatedDisabled: state.form.isRelatedDisabled
  }),
  dispatch => ({
    actions: bindActionCreators(formActions, dispatch)
  })
)
export default class UIButton extends Component {
  static propTypes = {}
  state = {}
  componentWillMount () {}
  componentWillReceiveProps (nextProps) {}

  onClick (e) {
    window.alert(`你点击了按钮：${e.target.innerText}`)
  }

  switchDisabled = e => {
    const {actions} = this.props
    actions.switchRelatedDisabled()
  }

  render () {
    // const {isRelatedDisabled} = this.props
    return (
      <div className='InputDemo'>
        <h2>Input</h2>
        <div>
          <h3>基本用法</h3>
          <Input id='ui1-1' placeholder='type=text as default' />
          <Input id='ui1-2' type='password' placeholder='type=password' />
          <Input id='ui1-3' type='email' placeholder='type=email' />
          <Input id='ui1-4' type='tel' placeholder='type=tel' />
          <Input id='ui1-5' type='url' placeholder='type=url' />
          <Input id='ui1-6' type='number' placeholder='type=number' />
          <Input id='ui1-7' placeholder='disabled' disabled />
          <p>
            type 取值同原生 input 标签的 type 属性，但要注意这种原生控件对浏览器版本的依赖。
            例如 type=number，更建议使用 Input.Number 控件。
          </p>
        </div>
        <div>
          <h3>Label</h3>
          <Input id='ui1-2-1' placeholder='Labeled Input' label='我有Label：' />
          <Input id='ui1-2-2' placeholder='Labeled Input' label='我有Label，但禁用了：' disabled />
        </div>
      </div>
    )
  }
}
