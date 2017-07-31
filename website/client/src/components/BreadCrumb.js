/**
 * @file BreadCrumb Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './BreadCrumb.css'

const DISPLAY_MAP = {
  '': '首页'
}

export default class BreadCrumb extends Component {
  static propTypes = {}
  state = {}
  componentWillMount () {}
  componentWillReceiveProps (nextProps) {}

  render () {
    const {router} = this.props
    let pathname = router && router.location.pathname
    const paths = pathname.replace(/\/$/, '').split('/')
    return (
      <ul className='breadcrumb'>
        {paths.map((p, i, arr) => {
          const toDisplay = DISPLAY_MAP[p] || p
          const addr = '/' + p
          if (i === arr.length - 1) {
            return <li key={addr}>{toDisplay}</li>
          } else {
            return <li key={addr}><Link to={addr}>{toDisplay}</Link></li>
          }
        })}
      </ul>
    )
  }
}
