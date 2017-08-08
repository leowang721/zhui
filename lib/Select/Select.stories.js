import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, select, boolean, object} from '@storybook/addon-knobs'

import Select from './'
import TagSelect from './TagSelect'
import Input from '../Input'
import Button from '../Button'
import './Select.stories.css'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='SelectDemo'>
    <div className='SimpleSelect'>
      <Select id='ui1-1' defaultValue={1} onChange={valueChangeHandler} label='我是Label：'>
        <Select.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Select.Option>
        <Select.Option value={2}>222</Select.Option>
        <Select.Option value={3}>333</Select.Option>
        <Select.Option value={4}>444</Select.Option>
        <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
      </Select>
      <Input id='ui1-2' />
      <Button id='ui1-3'>啊啊啊</Button>
    </div>
    <div>
      <Select.InlineEdit id='ui2-1' defaultValue={2} onChange={valueChangeHandler} label='我是Label：'>
        <Select.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Select.Option>
        <Select.Option value={2}>222</Select.Option>
        <Select.Option value={3}>333</Select.Option>
        <Select.Option value={4}>444</Select.Option>
        <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
      </Select.InlineEdit>
    </div>
    <div>
      <Select id='ui3-1' defaultValue={3} onChange={valueChangeHandler} label='我是Label：' filterMode>
        <Select.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Select.Option>
        <Select.Option value={2}>222</Select.Option>
        <Select.Option value={3}>333</Select.Option>
        <Select.Option value={4}>444</Select.Option>
        <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
      </Select>
    </div>
    <div>
      <h2>Controlled</h2>
      <div>
        <Select id='ui5-1' value={3} onChange={valueChangeHandler} label='我是Label：' filterMode>
          <Select.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Select.Option>
          <Select.Option value={2}>222</Select.Option>
          <Select.Option value={3}>333</Select.Option>
          <Select.Option value={4}>444</Select.Option>
          <Select.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Select.Option>
        </Select>
      </div>
    </div>
  </div>
)

stories.add('Custom', () => {
  const label = text('label', 'Label：')
  const options = {
    text: 'text',
    password: 'password',
    tel: 'tel',
    email: 'email',
    number: 'number',
    url: 'url'
  }
  const value = select('value', options)
  const disabled = boolean('disabled', false)
  const style = object('style', {})

  return (
    <Select id='ui1-1' label={label} value={value} disabled={disabled} style={style} onChange={valueChangeHandler} >
      {Object.keys(options).map(op => (<Select.Option key={op} value={op} title={'title ' + op}>{op}</Select.Option>))}
    </Select>
  )
})

const languages = ['Javascript', 'Python', 'Elixir', 'Ruby', 'Rust', 'Scala']
class TagSelectDemo extends Component {
  state = {
    value: []
  }

  handleChange = (value) => {
    this.setState({value})
  }

  render () {
    return (
      <TagSelect placeholder='???' value={this.state.value} onChange={this.handleChange}>
        {languages.map(language =>
          <Select.Option key={language} value={language}>{language}</Select.Option>
        )}
      </TagSelect>
    )
  }
}

stories.add('TagSelect', () => {
  return (
    <TagSelectDemo />
  )
})
