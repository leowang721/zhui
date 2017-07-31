import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, select, boolean, object} from '@storybook/addon-knobs'

import Radio from './'
import Input from '../Input'
import Button from '../Button'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('Radio', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='SelectDemo'>
    <div className='SimpleSelect'>
      <Radio id='ui1-1' defaultValue={1} onChange={valueChangeHandler}>
        <Radio.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Radio.Option>
        <Radio.Option value={2}>222</Radio.Option>
        <Radio.Option value={3} disabled>333</Radio.Option>
        <Radio.Option value={4}>444</Radio.Option>
        <Radio.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Radio.Option>
      </Radio>
      <Input id='ui1-2' />
      <Button id='ui1-3'>啊啊啊</Button>
    </div>
    <div>
      <Radio id='ui1-2' value={1} onChange={valueChangeHandler}>
        <Radio.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</Radio.Option>
        <Radio.Option value={2}>222</Radio.Option>
        <Radio.Option value={3} disabled>333</Radio.Option>
        <Radio.Option value={4}>444</Radio.Option>
        <Radio.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</Radio.Option>
      </Radio>
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
    <Radio id='ui1-1' label={label} value={value} disabled={disabled} style={style} onChange={valueChangeHandler} >
      {Object.keys(options).map(op => (<Radio.Option value={op} key={op} title={'title ' + op}>{op}</Radio.Option>))}
    </Radio>
  )
})
