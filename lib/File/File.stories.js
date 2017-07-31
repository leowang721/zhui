import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'

import File from './'
import './File.stories.css'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('File', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='FileDemo'>
    <div>
      <File id='ui1-1' onChange={valueChangeHandler} label='日期：' />
    </div>
    <div>
      <File id='ui1-1' onChange={valueChangeHandler} label='日期：' maxSize={2055} value={[
        {
          id: 'file1',
          name: 'file1',
          path: 'http://file1.jpg'
        }
      ]} />
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
