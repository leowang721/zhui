import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, number, boolean} from '@storybook/addon-knobs'

import TreeSelect from './'
import config from './config'

import './TreeSelect.stories.css'

const valueChangeHandler = action('value-change')
const stories = storiesOf('TreeSelect', module)

stories.addDecorator(withKnobs)

const REGION = config.CHINA.children
stories.add('Demo', () =>
  <div className='TreeSelectDemo'>
    <div>
      <TreeSelect placeholder='啦啦啦' level={2} onChange={valueChangeHandler} treeData={REGION} value={[110000, 130200]} />
    </div>
  </div>
)

stories.add('Custom', () => {
  const label = text('label', 'Label：')
  const disabled = boolean('disabled', false)
  const level = number('level', 2)

  return (
    <TreeSelect label={label} disabled={disabled} level={level} treeData={REGION} onChange={valueChangeHandler} />
  )
})
