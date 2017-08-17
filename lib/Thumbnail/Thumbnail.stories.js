import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Thumbnail from './'

import './Thumbnail.stories.css'

const stories = storiesOf('Thumbnail', module)

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='ThumbnailDemo'>
    <section>
      <h3>Demo</h3>
      <Thumbnail
        src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502724353248&di=6ecc39678569af6215aeef0c377ed264&imgtype=0&src=http%3A%2F%2Fbizhi.zhuoku.com%2F2009%2F11%2F01%2Fheise%2Fheise19.jpg'
      />
    </section>
  </div>
)
