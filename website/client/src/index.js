/**
 * @file 全局入口
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import routes from './routes'

import './resource/css/common.css'

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('main')
)
