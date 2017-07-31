/**
 * @file reducer - test
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import {handleActions} from 'redux-actions'
// import actions from '../actions/form'

/**
 * 定义 reducers，使用了 handleActions
 *
 * 注意，这里的定义中，state 指的就是 当前要修正的具体 state 值 而不是整体的 store了，
 * 在本例中，指的是： state.form
 * 因此使用、默认值以及最终返回都是它
 * 不能去修改其他的值了
 */
export default handleActions({
  // PUSH: (state = [], action) => {
  //   const message = action.payload
  //   let list = [...state]
  //   list.push(message)
  //   return list
  // },
  // POP: (state, action) => {
  //   const message = action.payload
  //   let list = [...state]
  //   list.pop()
  //   return list
  // },
  // CLEAR: (state, action) => {
  //   return []
  // }
  switchRelatedDisabled: (state, action) => {
    console.log(state)
    return {
      ...state,
      isRelatedDisabled: !state.isRelatedDisabled
    }
  }
}, {
  isRelatedDisabled: false
})
