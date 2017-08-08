import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Dialog from './'
import Button from '../Button'

import './Dialog.stories.css'

const stories = storiesOf('Confirm', module)

stories.addDecorator(withKnobs)

const handleShowConfirm = () => {
  Dialog.Confirm
    .show({
      title: '标题',
      content: '内容'
    })
    .then(() => {
      window.alert('点击了确定')
    })
    .catch(() => {
      window.alert('点击了取消')
    })
}

stories.add('Demo', () =>
  <div className='DialogDemo'>
    <section>
      <h3>Demo</h3>
      <Button onClick={handleShowConfirm}>点我看对话框</Button>
    </section>
  </div>
)
