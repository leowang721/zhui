/**
 * @file 主容器
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BreadCrumb from '../components/BreadCrumb'

import './App.css'

@connect(
  // mapStateToProps
  state => {
    return {
      router: state.router
    }
  },
  // mapDispatchToProps
  dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
  })
)
export default class App extends React.Component {
  render () {
    const {children, router} = this.props
    return (
      <div className='app'>
        <h1>zhui - 测试用站点</h1>
        <BreadCrumb router={router} />
        <div>
          {children}
        </div>
      </div>
    )
  }
}
