/**
 * @file Routes
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
// import {Switch} from 'react-router'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'

import history from './history'
import App from './containers/App'
import Home from './containers/Home'

import uiRoutes from './containers/ui/routes'

export default (
  <ConnectedRouter history={history}>
    <App>
      <Route exact path='/' component={Home} />
      {uiRoutes}
    </App>
  </ConnectedRouter>
)
