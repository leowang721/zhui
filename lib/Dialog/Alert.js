/**
 * @file DialogAlert Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import once from 'lodash/once'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import {getControlPartClassName} from '../util'
import Popup from '../Popup'
import Button from '../Button'

import './Dialog.css'

let counter = 1

/**
 * DialogAlert 组件
 *
 * @export
 * @class DialogAlert
 * @extends {Component}
 */
class DialogAlert extends Component {
  static ctrlName = 'DialogAlert'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} [title='请确认'] 标题
   * @property {string} [content=''] 信息
   */
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.any,
    onClose: PropTypes.func,
  }

  /**
   * 默认的 props
   *
   * @static
   * @memberof Input
   */
  static defaultProps = {
    title: '提示'
  }

  close = e => {
    this.props.onClose && this.props.onClose()
  }

  getClassName (part, state) {
    return getControlPartClassName('DialogAlert', part, state)
  }

  render () {
    const {
      title,
      content
    } = this.props

    let id = `Alert${counter}`

    return (
      <Popup id={`${id}-popup`} visible hideOnClickDocument={false} fixed maskType='black'>
        <div className={this.getClassName('container')}>
          <div className={this.getClassName('title')}>
            {title}
          </div>
          <div className={this.getClassName('content')}>
            {content}
          </div>
          <div className={this.getClassName('footer')}>
            <Button id={`${id}-close`} skin='primary' onClick={this.close}>确认</Button>
          </div>
        </div>
      </Popup>
    )
  }
}

export default {
  show ({title, content}) {
    const holder = document.createElement('div')
    document.body.appendChild(holder)

    const cleanup = once(() => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(holder)
        document.body.removeChild(holder)
      })
    })

    ReactDOM.render(
      <DialogAlert
        id={`DialogAlert-${counter++}`}
        title={title}
        content={content}
        onClose={cleanup}
      />,
      holder
    )
  }
}
