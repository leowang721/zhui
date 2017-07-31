import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, select, boolean, object} from '@storybook/addon-knobs'

import Input from './'
import InputInlineEdit from './InlineEdit'
// import './Input.stories.css'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('Input', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='InputDemo'>
    <div>
      <p>
        如果你通过 props.value 控制 value，那么你需要通过 onChange 获取改变的值后，通过 props.value 再传进去，否则值不会再改变
      </p>
      <h3>基本用法</h3>
      <Input id='ui1-1' placeholder='type=text as default' onChange={valueChangeHandler} />
      <Input id='ui1-2' type='password' placeholder='type=password' onChange={valueChangeHandler} />
      <Input id='ui1-3' type='email' placeholder='type=email' onChange={valueChangeHandler} />
      <Input id='ui1-4' type='tel' placeholder='type=tel' onChange={valueChangeHandler} />
      <Input id='ui1-5' type='url' placeholder='type=url' onChange={valueChangeHandler} autoFocus />
      <Input id='ui1-6' type='number' placeholder='type=number' onChange={valueChangeHandler} />
      <Input id='ui1-7' placeholder='disabled' disabled onChange={valueChangeHandler} />
      <Input id='ui1-8' placeholder='hahahaha' onChange={valueChangeHandler} type='checkbox' />
      <p>
        type 取值同原生 input 标签的 type 属性，但要注意这种原生控件对浏览器版本的依赖。
        例如 type=number，更建议使用 Input.Number 控件。
      </p>
    </div>
    <div>
      <h3>Label</h3>
      <Input id='ui2-1' placeholder='Labeled Input' label='我有Label：' onChange={valueChangeHandler} />
      <Input id='ui2-2' placeholder='Labeled Input' label='我有Label，但禁用了：' disabled onChange={valueChangeHandler} />
    </div>
    <div>
      <h3>自校验</h3>
      <Input id='ui3-1' placeholder='self validation' label='独立使用自校验：'
        rules={{min: 5, max: 10, message: '输入长度 5 - 10 个字符'}}
        onChange={valueChangeHandler} />
    </div>
    <div>
      <h3>行内修改模式</h3>
      <InputInlineEdit id='ui4-1' placeholder='self validation' label='独立使用自校验：'
        rules={{min: 5, max: 10, message: '输入长度 5 - 10 个字符'}}
        onChange={valueChangeHandler} />
    </div>
    <div>
      <h3>Controlled</h3>
      <Input id='ui5-1' placeholder='self validation' label='Controlled:'
        rules={{min: 5, max: 10, message: '输入长度 5 - 10 个字符'}}
        value='owjeiojw'
        onChange={valueChangeHandler} />
      <InputInlineEdit id='ui5-2' placeholder='self validation' label='Controlled'
        rules={{min: 5, max: 10, message: '输入长度 5 - 10 个字符'}}
        value='awerw'
        onChange={valueChangeHandler} />
    </div>
  </div>
)

stories.add('Custom', () => {
  const label = text('label', 'Label：')
  const type = select('type', {
    default: '',
    text: 'text',
    password: 'password',
    tel: 'tel',
    email: 'email',
    number: 'number',
    url: 'url'
  }, 'default')
  const value = text('value', '')
  const disabled = boolean('disabled', false)
  const style = object('style', {})
  const rules = object('rules', {})

  return (
    <Input id='input1' type={type} disabled={disabled} label={label} value={value} rules={rules} style={style} onChange={valueChangeHandler} />
  )
})
