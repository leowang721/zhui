/**
 * @file file Component
 *
 * @author Jie Zhu(zhujie@zhihu.com)
 */

import PropTypes from 'prop-types'
import React, {Component} from 'react'
import cx from 'classnames'
import './index.css'

class SVG extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  }

  render () {
    const {name, src, title, ...props} = this.props
    const SvgComponent = src ? require(src).default : require(`./icons/${name}.svg`).default

    return (
      <SvgComponent {...props} />
    )
  }
}

const defaultWidthMap = {
  camera: 16
}

class Icon extends Component {
  render () {
    const {className, left, name, src, width, height = 16, style, fill, ...restProps} = this.props
    const finalWidth = width || defaultWidthMap[name] || 14

    return (
      <SVG
        className={cx('Icon', className, `Icon--${name}`, {
          'Icon--left': left
        })}
        style={{
          ...style,
          fill,
          height: `${height}px`,
          width: `${finalWidth}px`
        }}
        width={finalWidth}
        height={height}
        name={name}
        src={src}
        aria-hidden
        {...restProps}
      />
    )
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Icon
