import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Pager from './'

import './Pager.stories.css'

const stories = storiesOf('Pager', module)

const changePage = (pageNumer) => {
  console.log(pageNumer)
}

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='PagerDemo'>
    <section>
      <h3>Demo</h3>
      <Pager
        align='left' // 默认 center
        totalCount={100}
        perPage={11}
        page={10}
        onChange={changePage}
      />
    </section>
  </div>
)
