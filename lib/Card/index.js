import React, {Component} from 'react'
import cx from 'classnames'

import './index.css'

export default class Card extends Component {
  render () {
    const {padding, className, children} = this.props
    return (
      <div className={cx('ZhuiCard', padding && 'ZhuiCard--padding', className)}>
        {children}
      </div>
    )
  }
}
