/**
 * @file DialogConfirm Component
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

import './Confirm.css'

let counter = 1

/**
 * DialogConfirm 组件
 *
 * @export
 * @class DialogConfirm
 * @extends {Component}
 */
class DialogConfirm extends Component {
  static ctrlName = 'DialogConfirm'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} [title='请确认'] 标题
   * @property {string} [content=''] 信息
   */
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.any,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func
  }

  /**
   * 默认的 props
   *
   * @static
   * @memberof Input
   */
  static defaultProps = {
    title: '请确认'
  }

  confirm = e => {
    this.props.onConfirm && this.props.onConfirm()
  }

  cancel = e => {
    this.props.onCancel && this.props.onCancel()
  }

  getClassName (part, state) {
    return getControlPartClassName('DialogConfirm', part, state)
  }

  render () {
    const {
      title,
      content
    } = this.props

    let id = `Confirm${counter}`

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
            <Button id={`${id}-confirm`} skin='primary' onClick={this.confirm}>确认</Button>
            <Button id={`${id}-cancel`} onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </Popup>
    )
  }
}

export default {
  show({title, content}) {
    return new Promise((resolve, reject) => {
      const holder = document.createElement('div')
      document.body.appendChild(holder)

      const cleanup = once(() => {
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(holder)
          document.body.removeChild(holder)
        })
      })

      const handleConfirm = () => {
        cleanup()
        resolve()
      }

      const handleCancel = () => {
        cleanup()
        reject()
      }

      ReactDOM.render((
        <DialogConfirm
          id={`DialogConfig-${counter++}`}
          title={title}
          content={content}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      ), holder)
    })
  }
}
