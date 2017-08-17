import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'
import moment from 'moment'

import DatePicker from './'
import DatePickerRange from './Range'
import './DatePicker.stories.css'

moment.locale('zh-cn')

const valueChangeHandler = action('value-changed')
const stories = storiesOf('DatePicker', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='DatePickerDemo'>
    <div>
      <DatePicker id='ui1-1' onChange={valueChangeHandler} label='日期：' value='2017-07-21' />
      <DatePicker id='ui1-2' plainMode onChange={valueChangeHandler} label='日期：' defaultValue='2017-07-21' />
    </div>
    <div>
      <DatePickerRange id='ui2-1' label='日期范围：' value={['2017-07-19', '2017-07-21']} onChange={valueChangeHandler} alignPosition='rb' alignDirection='lb' />
      <DatePickerRange id='ui2-2' label='日期范围：' defaultValue={['2017-07-02', '2017-07-21']} plainMode onChange={valueChangeHandler} />
      <DatePickerRange id='ui2-1' label='日期范围：' value={['2017-07-19', '2017-07-21']} onChange={valueChangeHandler} alignPosition='rb' alignDirection='lb' />
    </div>
  </div>
)

// stories.add('Custom', () => {
//   const label = text('label', 'Label：')
//   const options = {
//     text: 'text',
//     password: 'password',
//     tel: 'tel',
//     email: 'email',
//     number: 'number',
//     url: 'url'
//   }
//   const value = select('value', options)
//   const disabled = boolean('disabled', false)
//   const style = object('style', {})

//   return (
//     <Select id='ui1-1' label={label} value={value} disabled={disabled} style={style} onChange={valueChangeHandler} >
//       {Object.keys(options).map(op => (<Select.Option key={op} value={op} title={'title ' + op}>{op}</Select.Option>))}
//     </Select>
//   )
// })
