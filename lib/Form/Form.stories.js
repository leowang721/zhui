import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, select, object} from '@storybook/addon-knobs'

import Form from './'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import Radio from '../Radio'
import CheckBox from '../CheckBox'

import './Form.stories.css'

const formSubmitHandler = action('form-submit')

function setFormValue (form) {
  const num = Math.random()
  form.setValue({
    word: `word${num}`,
    username: `username${num}`,
    password: `password${num}`
  })
}

function clearFormValue (form) {
  form.clearValue({})
}

function resetFormValue (form) {
  form.resetValue({})
}

const stories = storiesOf('Form', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='FormDemo'>
    <Form onSubmit={formSubmitHandler} ref={form => { this.form = form }}>
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
      <Input id='username' label='输入您的用户名：' rules={{required: true, whitespace: true}} />
      <Input id='password' label='输入您的密码：' type='password' rules={{required: true, whitespace: true}} />

      <Input.InlineEdit
        id='hellomsg' placeholder='self validation' label='行内修改模式1：' defaultValue='Hello World'
        rules={{min: 5, max: 10, required: true, message: '输入长度 5 - 10 个字符'}} />
      <Select id='selectui'>
        <Select.Option value={1}>111111</Select.Option>
        <Select.Option value={2}>222</Select.Option>
        <Select.Option value={3}>333</Select.Option>
        <Select.Option value={4} selected>444</Select.Option>
        <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
      </Select>

      <Select.InlineEdit id='inlineselect' label='行内修改模式2：'>
        <Select.Option value={1}>111111</Select.Option>
        <Select.Option value={2}>222</Select.Option>
        <Select.Option value={3}>333</Select.Option>
        <Select.Option value={4} selected>444</Select.Option>
        <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
      </Select.InlineEdit>

      <Radio id='sex' label='选择性别：' rules={[{required: true}]}>
        <Radio.Option value='male'>男</Radio.Option>
        <Radio.Option value='female' checked>女</Radio.Option>
      </Radio>
      <CheckBox id='girls' label='选择妹子：' rules={[{required: true}]}>
        <CheckBox.Option checked value='Avril'>Avril</CheckBox.Option>
        <CheckBox.Option checked value='Angela'>Angela</CheckBox.Option>
      </CheckBox>

      <Button id='subbut' type='submit' onClick={this.onClick} skin='primary'>提交</Button>
      <Button.Group id='btngroup'>
        <Button id='btn4' onClick={() => { setFormValue(this.form) }}>setFormValue</Button>
        <Button id='btn5' onClick={() => { clearFormValue(this.form) }}>clearFormValue</Button>
        <Button id='btn6' onClick={() => { resetFormValue(this.form) }}>resetFormValue</Button>
      </Button.Group>
    </Form>
  </div>
)

stories.add('Custom', () => {
  const layout = select('layout', {
    default: '',
    horizontal: 'horizontal',
    vertical: 'vertical',
    inline: 'inline'
  }, 'default')

  const style = object('style', {})

  return (
    <div className='FormDemo'>
      <Form layout={layout} style={style}>
        <Input id='word' label='输入单词：' defaultValue='init' />
        <Input id='username' label='输入您的用户名：' placeholder='username' />
        <Select id='selectui'>
          <Select.Option value={1}>111111</Select.Option>
          <Select.Option value={2}>222</Select.Option>
          <Select.Option value={3}>333</Select.Option>
          <Select.Option value={4}>444</Select.Option>
          <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
        </Select>
        <Radio id='sex' label='选择性别：' rules={[{required: true}]}>
          <Radio.Option value='male'>男</Radio.Option>
          <Radio.Option value='female' checked>女</Radio.Option>
        </Radio>
        <CheckBox id='girls' label='选择妹子：' rules={[{required: true}]}>
          <CheckBox.Option checked value='Avril'>Avril</CheckBox.Option>
          <CheckBox.Option checked value='Angela'>Angela</CheckBox.Option>
        </CheckBox>
        <Button id='subbut' type='submit' skin='primary'>提交</Button>
        <Button.Group>
          <Button id='btn4'>L</Button>
          <Button id='btn5'>M</Button>
          <Button id='btn6'>R</Button>
        </Button.Group>
      </Form>
    </div>
  )
})
