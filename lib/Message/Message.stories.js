import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Message from './'
import Button from '../Button'

import './Message.stories.css'

const stories = storiesOf('Message', module)

stories.addDecorator(withKnobs)

const handleShowMessage = status => () => {
  Message.show({
    content: `我是 ${status} 消息框`,
    type: status
  })
}

stories.add('Demo', () =>
  <div className='MessageDemo'>
    <section>
      <h3>demo</h3>
      <div className='MessageDemo-btnWrap'>
        <Button onClick={handleShowMessage('info')}>点我查看消息框「info」</Button>
        <Button onClick={handleShowMessage('success')}>点我查看消息框「success」</Button>
        <Button onClick={handleShowMessage('warning')}>点我查看消息框「warning」</Button>
        <Button onClick={handleShowMessage('error')}>点我查看消息框「error」</Button>
      </div>
    </section>
  </div>
)
