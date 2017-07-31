/**
 * @file redux - store
 *
 * @author Leo Wang(wangkemiao@zhihuc.om)
 */

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {routerReducer, routerMiddleware} from 'react-router-redux'

import history from './history'
import * as reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const historyMiddleWare = routerMiddleware(history)

let store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(historyMiddleWare)
  )
)

export default store
