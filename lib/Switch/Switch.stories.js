import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, boolean} from '@storybook/addon-knobs'

import Switch from './'

const valueChangeHandler = action('value-change')
const stories = storiesOf('Switch', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='ToggleDemo'>
    <div>
      <Switch onChange={valueChangeHandler} />
    </div>
  </div>
)

stories.add('Custom', () => {
  const label = text('label', 'Label：')
  const value = boolean('value', true)

  return (
    <Switch label={label} value={value} onChange={valueChangeHandler} />
  )
})
