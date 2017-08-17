/**
 * @file FullImage Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import Popup from '../Popup'

import './index.css'

/**
 * FullImage 组件
 *
 * @export
 * @class FullImage
 * @extends {Component}
 */
export class FullImage extends Component {
  static ctrlName = 'FullImage'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {string} [title='请确认'] 标题
   */
  static propTypes = {
    src: PropTypes.string
  }

  getClassName (part, state) {
    return getControlPartClassName('FullImage', part, state)
  }

  render () {
    const {src, onClick} = this.props

    return (
      <Popup className={this.getClassName('popup')} visible hideOnClickDocument={false} fixed maskType='black' onClick={onClick}>
        <img src={src} />
      </Popup>
    )
  }
}

export default class Thumbnail extends Component {
  static ctrlName = 'Thumbnail'

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      fullImageShown: false
    }
  }

  getClassName (part, state) {
    return getControlPartClassName('Thumbnail', part, state)
  }

  handleFullImageShow = () => {
    this.setState({fullImageShown: true})
  }

  handleFullImageHide = () => {
    this.setState({fullImageShown: false})
  }

  render () {
    const {className, src} = this.props
    const {fullImageShown} = this.state
    return (
      <div className={cx(this.getClassName(), this.getClassName(className))}>
        <img
          src={src}
          onClick={this.handleFullImageShow}
        />
        {fullImageShown &&
          <FullImage
            src={src}
            onClick={this.handleFullImageHide}
          />
        }
      </div>
    )
  }
}
