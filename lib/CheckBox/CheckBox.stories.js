import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, select, boolean, object} from '@storybook/addon-knobs'

import CheckBox from './'
import Input from '../Input'
import Button from '../Button'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('CheckBox', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='SelectDemo'>
    <div className='SimpleSelect'>
      <div>
        Checkbox Props:
        <ul>
          <li>defaultValue： 配置哪些项被选中，会覆盖 option 的 checked</li>
          <li>onChange: 修改时触发句柄</li>
        </ul>

        Checkbox.Option Props:
        <ul>
          <li>value: 值配置</li>
          <li>onCheckedChange： 选择时触发句柄，值为 bool</li>
        </ul>
      </div>
      <CheckBox id='ui1-1' defaultValue={1} onChange={valueChangeHandler}>
        <CheckBox.Option value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</CheckBox.Option>
        <CheckBox.Option value={2}>222</CheckBox.Option>
        <CheckBox.Option value={3}>333</CheckBox.Option>
        <CheckBox.Option value={4} disabled>444</CheckBox.Option>
        <CheckBox.Option value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</CheckBox.Option>
      </CheckBox>
      <Input id='ui1-2' />
      <Button id='ui1-3'>啊啊啊</Button>
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
    <CheckBox id='ui1-1' label={label} value={value} disabled={disabled} style={style} onChange={valueChangeHandler} >
      {Object.keys(options).map(op => (
        <CheckBox.Option value={op} key={op} title={'title ' + op}>
          {op}
        </CheckBox.Option>
      ))}
    </CheckBox>
  )
})
