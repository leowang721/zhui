/**
 * @file Popup Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import pick from 'lodash.pick'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import * as domUtil from '../util/dom'

import './index.css'

// ZIndex
const ZINDEX = 10000

let currentZIndex = ZINDEX  // popup default
function calculateZIndex () {
  return currentZIndex++
}

/**
 * 弹出层组件
 *
 * @export
 * @class Popup
 * @extends {Component}
 */
export default class Popup extends Component {
  static ctrlName = 'Popup'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {any} [value] 控件值，透传自 Control
   *
   * @property {function} [onChange] 同步值变化的句柄，透传自 Control
   */
  static propTypes = {
    className: PropTypes.string,
    mask: PropTypes.bool,
    maskType: PropTypes.oneOf(['white', 'black', 'none']),
    hideOnClickDocument: PropTypes.bool,
    alignElement: PropTypes.any,
    alignPosition: PropTypes.string,  // 对齐的位置，例如 bl
    alignDirection: PropTypes.string,  // 确定位置后的延伸方向，可选值： bl, tl, br, tr
    // 事件 或 句柄
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    mask: true,
    maskType: 'white',
    hideOnClickDocument: true,
    alignPosition: 'bl',
    alignDirection: 'br',
    onShow () {},
    onHide () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      visible: !!props.visible
    }
  }

  componentDidMount () {
    const container = this.getContainer()
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), container)
    this.processDocumentEvent()
  }
  componentDidUpdate () {
    const container = this.getContainer()
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), container)
    this.processDocumentEvent()
  }

  processDocumentEvent () {
    if (this.props.hideOnClickDocument) {
      if (this.state.visible) {
        this.bindDocumentClickHandler()
      } else {
        this.clearDocumentClickHandler()
      }
    }
  }

  bindDocumentClickHandler () {
    if (!this.binded) {
      document.documentElement.addEventListener('mouseup', this.hide)
      this.content && this.content.addEventListener('mouseup', this.preventContentMouseupHide)
      this.binded = true
    }
  }
  clearDocumentClickHandler () {
    if (this.binded) {
      document.documentElement.removeEventListener('mouseup', this.hide)
      this.content && this.content.removeEventListener('mouseup', this.preventContentMouseupHide)
      this.binded = false
    }
  }

  preventContentMouseupHide (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  componentWillUnmount () {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container)
      document.body.removeChild(this.container)
      this.container = null
    }
    if (this.props.hideOnClickDocument) {
      this.clearDocumentClickHandler()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({visible: nextProps.visible})
    }
  }

  getContainer () {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.style.position = 'absolute'
      this.container.style.top = '0'
      this.container.style.left = '0'
      this.container.style.zIndex = calculateZIndex()
      this.container.style.width = '100%'
      this.container.style.height = 0
      document.body.appendChild(this.container)
    }
    return this.container
  }

  getZIndex () {
    return this.props.zIndex ? this.props.zIndex : calculateZIndex()
  }

  getAlignStyles () {
    const {alignElement, alignPosition, alignDirection} = this.props

    // 计算 alignElement 的位置
    if (alignElement) {
      return domUtil.getRelativeOffset(this.contentDom, alignElement, alignPosition, alignDirection)
    }
  }

  show = () => {
    this.container.style.height = '100%'
    this.setState({visible: true})
    this.props.onShow()
  }
  hide = () => {
    this.container.style.height = 0
    this.setState({visible: false})
    this.props.onHide()
  }
  toggle = () => {
    this.setState({visible: !this.state.visible})
  }

  getComponent () {
    const {
      className,
      maskType,
      children,
      ...restProps
    } = this.props

    const visiblility = this.state.visible ? 'visible' : 'hidden'

    const ctrlClassNames = cx(
      getControlPartClassName('Popup'),
      getControlPartClassName('Popup', '', visiblility),
      getControlPartClassName('Popup', 'mask', maskType),
      this.props.fixed ? getControlPartClassName('Popup', 'mask', 'fixed') : '',
      className
    )

    const passThroughProps = pick(restProps, ['onClick'])

    return (
      <div className={ctrlClassNames} ref={dom => { this.content = dom }} {...passThroughProps}>
        <div className={getControlPartClassName('Popup', 'content')} style={this.getAlignStyles()} ref={dom => { this.contentDom = dom }}>
          {children}
        </div>
      </div>
    )
  }

  render () {
    return null
  }
}
