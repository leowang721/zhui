import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'

import Search from './'

const valueSearchHandler = action('value-search')
const stories = storiesOf('Search', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='SearchDemo'>
    <div>
      <Search placeholder='啦啦啦' onSearch={valueSearchHandler} />
    </div>
  </div>
)
