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

import './Dialog.css'

let counter = 1

/**
 * DialogConfirm 组件
 *
 * @export
 * @class DialogConfirm
 * @extends {Component}
 */
export class DialogConfirm extends Component {
  static ctrlName = 'DialogConfirm'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} [title='请确认'] 标题
   */
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.any,
    content: PropTypes.any,
    buttonDirection: PropTypes.string,
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
    title: '请确认',
    buttonDirection: 'horizontal'
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
      className,
      title,
      subTitle,
      buttonDirection,
      content,
      children
    } = this.props

    let id = `Confirm${counter}`

    return (
      <Popup className={className} id={`${id}-popup`} visible hideOnClickDocument={false} fixed maskType='black'>
        <div className={this.getClassName('container')}>
          <div className={this.getClassName('title')}>
            {title}
          </div>
          {subTitle &&
            <div className={this.getClassName('subTitle')}>
              {subTitle}
            </div>
          }
          {content &&
            <div className={this.getClassName('content')}>
              {content}
            </div>
          }
          {children &&
            <div className={this.getClassName('content')}>
              {children}
            </div>
          }
          <div
            className={
              `${this.getClassName('footer')} ${this.getClassName('footer')}--${buttonDirection}`
            }
          >
            <Button id={`${id}-confirm`} skin='primary' onClick={this.confirm}>确认</Button>
            <Button id={`${id}-cancel`} skin='ignore' onClick={this.cancel}>取消</Button>
          </div>
        </div>
      </Popup>
    )
  }
}

export default {
  show ({title, subTitle, content, buttonDirection, children}) {
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
        reject(new Error('取消'))
      }

      ReactDOM.render(
        <DialogConfirm
          id={`DialogConfirm-${counter++}`}
          title={title}
          subTitle={subTitle}
          content={content}
          buttonDirection={buttonDirection}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        >
          {children}
        </DialogConfirm>,
        holder
      )
    })
  }
}
