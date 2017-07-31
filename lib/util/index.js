/**
 * @file util 方法
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import uniqueId from 'lodash/uniqueId'
import cx from 'classnames'
import {CLASS_PREFIX, STATUS} from './config'

export function generateCtrlId () {
  return uniqueId('zhuiCtrl-')
}

/**
 * 转换字符串为首字母大写的形式
 *
 * @private
 *
 * @param {string} [str='']
 * @returns {string} 首字母大写的字符串
 */
function toUpperCase (str = '') {
  if (!str) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 根据 props 获得对应的 status
 *
 * @export
 * @param {Object} [props={}]
 */
export function getStatusFromProps (props = {}, currentStatus = STATUS.NORMAL) {
  let status = currentStatus
  if (props.disabled) {
    status = STATUS.DISABLED
  } else if (props.readonly) {
    status = STATUS.READONLY
  }
  return status
}

/**
 * 获取 Control 的样式类名
 *
 * @export
 *
 * @param {string} name 控件类名
 * @param {string} [status=config.STATUS.NORMAL] 控件状态
 * @param {string} [skin] 皮肤
 */
export function getControlClassNames (name, status = STATUS.NORMAL, skin) {
  return cx(
    `${CLASS_PREFIX}${toUpperCase(name)}`,  // 控件样式
    skin ? `${CLASS_PREFIX}${name}Skin${toUpperCase(skin)}` : '',
    `${CLASS_PREFIX}${name}--is-${status}`  // 状态样式
  )
}

/**
 * 获取 Control 组成部分的样式类名
 *
 * @export
 *
 * @param {string} ctrlName 控件的名称
 * @param {string} [partName='']  组成部分的名称
 * @param {string} [state=''] 状态
 * @returns
 */
export function getControlPartClassName (ctrlName, partName = '', state = '') {
  let result = `${CLASS_PREFIX}${toUpperCase(ctrlName)}`
  if (partName) {
    result += `-${partName}`
  }
  if (state) {
    result += `--is-${state}`
  }
  return result
}
