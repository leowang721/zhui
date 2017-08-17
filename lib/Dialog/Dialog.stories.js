import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Dialog from './'
import Button from '../Button'

import './Dialog.stories.css'

const stories = storiesOf('Dialog', module)

stories.addDecorator(withKnobs)

const handleShowConfirm = () => {
  Dialog.Confirm
    .show({
      title: '标题',
      subTitle: '副标题',
      children: '内容'
    })
    .then(() => {
      window.alert('点击了确定')
    })
    .catch(e => {
      window.alert(`点击了取消：${e}`)
    })
}

const handleShowAlertHTML = () => {
  Dialog.Alert.show({
    title: 'html',
    content: <h1>我是 html 内容，「这是一个 h1 标签」</h1>
  })
}

const handleShowAlertString = () => {
  Dialog.Alert.show({
    title: 'string',
    content: 'content 为普通字符串'
  })
}

stories.add('Demo', () =>
  <div className='DialogDemo'>
    <section>
      <h3>Confirm Demo</h3>
      <div className='MessageDemo-btnWrap'>
        <Button onClick={handleShowConfirm}>点我查看确认框</Button>
      </div>
    </section>
    <section>
      <h3>Alert Demo</h3>
      <div className='MessageDemo-btnWrap'>
        <Button onClick={handleShowAlertHTML}>点我查看弹窗「content 为自定义 HTML」</Button>
        <Button onClick={handleShowAlertString}>点我查看弹窗「content 为普通字符串」</Button>
      </div>

    </section>
  </div>
)
