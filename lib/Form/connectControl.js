/**
 * @file FormControl 组件的 decorator
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import cx from 'classnames'
import omit from 'lodash.omit'
import React from 'react'
import Control from './Control'

import {getControlClassNames} from '../util'
import {getOffset} from '../util/dom'
import {CLASS_PREFIX} from '../util/config'

export default function connectControl (WrappedComponent) {
  return class ConnectedControl extends Control {
    static ctrlName = 'ConnectedControl'

    /**
     * 声明一个本类的 mark，当前用于 Form 中查找 Controls
     *
     * @static
     */
    static IS_ZHUI_FORM_CONTROL = true

    /**
     * 伪造了一个针对于非 Form 的 label click 处理
     *
     * @private
     */
    onLabelClick = e => {
      const targetId = e.target.getAttribute('for')
      let targetEl = document.getElementById(targetId)
      if (targetEl && !['input', 'select'].includes(targetEl.tagName.toLowerCase())) {
        targetEl.click && targetEl.click()
      }
    }

    scrollToShow () {
      if (this.mainDom) {
        const offset = getOffset(this.mainDom)
        let top = offset.top < 100 ? 0 : (offset.top - 100)
        window.scrollTo(offset.left, top)
      }
    }

    render () {
      const {
        label,
        skin,
        className,
        style,
        children,
        ...restProps
      } = this.props

      const {
        id,
        value,
        status,
        message
      } = this.state

      const toUseValue = value == null ? '' : value

      const passThroughProps = omit(restProps, [
        'defaultValue', 'value', 'status', 'rules', 'message',
        'onChange'
      ])

      const ctrlName = WrappedComponent.ctrlName
      const classes = cx(
        `${CLASS_PREFIX}FormCtrl`,  // 整体样式
        `${CLASS_PREFIX}FormCtrl--is-${status}`,  // 状态类
        getControlClassNames(ctrlName, status, skin),
        className  // 外部样式
      )

      return (
        <div
          className={classes}
          style={style}
          ref={dom => { this.mainDom = dom }}
        >
          <label
            htmlFor={id}
            title={typeof label === 'string' ? label : ''}
            className={`${CLASS_PREFIX}FormCtrl-label`}
            onClick={this.onLabelClick}
          >
            {this.isRequired() && <span style={{color: 'red', marginRight: 2}}>*</span>}
            {label}
          </label>
          <div className={`${CLASS_PREFIX}FormCtrl-content`}>
            <WrappedComponent
              {...passThroughProps}
              id={id}
              value={toUseValue}
              onChange={this.onChange}
              showMessage={this.showMessage}
            >
              {children}
            </WrappedComponent>
            <div className={`${CLASS_PREFIX}FormCtrl-message`}>
              {message}
            </div>
          </div>
        </div>
      )
    }
  }
}
