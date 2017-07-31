/**
 * @file 默认首页
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {bindActionCreators} from 'redux'

@connect(
  // mapStateToProps
  state => {
    return {}
  },
  // mapDispatchToProps
  dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
  })
)
export default class App extends React.Component {
  render () {
    // const {test} = this.props
    return (
      <div>
        <h2>好像这里应该呈现整体的 README.md </h2>
        <p>
          <ul>
            <li>
              <NavLink to='/ui'>查看 UI</NavLink>
            </li>
          </ul>
        </p>
      </div>
    )
  }
}
