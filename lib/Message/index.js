/**
 * @file Message Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import once from 'lodash/once'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import Popup from '../Popup'
import Button from '../Button'

import './index.css'

let counter = 1

/**
 * Message 组件
 *
 * @export
 * @class DialogConfirm
 * @extends {Component}
 */
class Message extends Component {
  static ctrlName = 'Message'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} [content=''] 信息
   */
  static propTypes = {
    content: PropTypes.any,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error'])
  }

  getClassName (part, state) {
    return getControlPartClassName('Message', part, state)
  }

  render () {
    const {
      content,
      type
    } = this.props

    let id = `Message${counter}`

    return (
      <Popup id={`${id}-popup`} visible hideOnClickDocument={false} fixed maskType='none'>
        <div className={cx([
          this.getClassName(''),
          this.getClassName('', type)
        ])}>
          {content}
        </div>
      </Popup>
    )
  }
}

export default {
  show ({content, type = 'info'}) {
    const holder = document.createElement('div')
    document.body.appendChild(holder)

    const cleanup = once(() => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(holder)
        document.body.removeChild(holder)
      }, 3000)
    })

    ReactDOM.render(
      <Message
        id={`Message-${counter++}`}
        type={type}
        content={content}
      />,
      holder
    )
    cleanup()
  }
}
