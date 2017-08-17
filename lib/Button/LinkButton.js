/**
 * @file Button Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import pick from 'lodash.pick'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import './index.css'

@connectControl
export default class LinkButton extends Component {
  static ctrlName = 'Button'

  static propTypes = {
    id: PropTypes.string,
    skin: PropTypes.string,
    href: PropTypes.string,
    target: PropTypes.string
  }

  render () {
    const {
      id,
      children,
      skin,
      ...restProps
    } = this.props

    const passThroughProps = pick(restProps, ['className', 'href', 'target'])

    return (
      <a
        {...passThroughProps}
        id={id}
      >
        {children}
      </a>
    )
  }
}
