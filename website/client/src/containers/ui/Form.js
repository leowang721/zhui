/**
 * @file Example Simple Container
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Form, Button, Input} from 'zhui'

import formActions from '../../actions/form'

// import './Simple.css'

@connect(
  state => ({
    isRelatedDisabled: state.form.isRelatedDisabled
  }),
  dispatch => ({
    actions: bindActionCreators(formActions, dispatch)
  })
)
export default class UIForm extends Component {
  static propTypes = {}
  state = {}
  componentWillMount () {}
  componentWillReceiveProps (nextProps) {}

  onClick (e) {
    window.alert(`你点击了按钮：${e.target.innerText}`)
  }
  onSubmit (formData) {
    window.alert(`你触发了表单的提交，数据为\n${JSON.stringify(formData)}`)
  }

  switchInput = e => {
    const {actions} = this.props
    actions.switchRelatedDisabled()
  }

  setFormValue = e => {
    const num = Math.random()
    this.form.setValue({
      word: `word${num}`,
      username: `username${num}`,
      password: `password${num}`,
      switchInput: `switchInput${num}`
    })
  }

  clearFormValue = e => {
    this.form.clearValue({})
  }

  resetFormValue = e => {
    this.form.resetValue({})
  }

  render () {
    const {isRelatedDisabled} = this.props
    return (
      <div>
        <h2>Form</h2>
        <section>
          <Form onSubmit={this.onSubmit} ref={form => { this.form = form }}>
            <Input id='word' label='输入单词：' defaultValue='init' rules={[
              {required: true, whitespace: true, message: '请输入单词'},
              {min: 5, message: '至少为5个字符'},
              {max: 20, message: '最多20个字符'},
              // {type: 'enum', enum: ['admin', 'user']},
              {pattern: /^[\w.]+$/, message: '不能输入特殊字符'},
              {validator: (rule, value, callback) => {
                callback(Math.random() > 0.3 ? undefined : new Error('30% 的自定义错误'))
              }}
            ]} />
            <Input id='username' label='输入您的 username：' rules={{required: true, whitespace: true}} />
            <Input id='password' label='输入您的密码：' type='password' rules={{required: true, whitespace: true}} />
            {isRelatedDisabled && <Input id='switchInput' label='switchinput：' rules={{required: true, whitespace: true}} />}

            <Form.Group layout='inline' style={{marginLeft: 150}}>
              <Button.Group>
                <Button id='btn1' type='submit' onClick={this.onClick} skin='primary'>提交</Button>
                <Button id='btn3' onClick={this.switchInput}>Switch Input</Button>
                <Button id='btn4' onClick={this.setFormValue}>setFormValue</Button>
                <Button id='btn5' onClick={this.clearFormValue}>clearFormValue</Button>
                <Button id='btn6' onClick={this.resetFormValue}>resetFormValue</Button>
              </Button.Group>
            </Form.Group>
          </Form>
        </section>
      </div>
    )
  }
}
