/**
 * @file Example Index Container
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {NavLink} from 'react-router-dom'

// import './Index.css'
@connect(
  state => ({}),
  dispatch => ({})
)
export default class UIIndex extends Component {
  render () {
    return (
      <div className='app-example'>
        <ul>
          <li><NavLink to='/ui/Form'>表单 Form</NavLink></li>
          <li><NavLink to='/ui/Button'>按钮 Button</NavLink></li>
          <li><NavLink to='/ui/Input'>文本输入 Input</NavLink></li>
        </ul>
      </div>
    )
  }
}
