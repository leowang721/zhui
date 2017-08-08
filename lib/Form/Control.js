/**
 * @file Form.Control 表单控件基类
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import AsyncValidator from 'async-validator'
import React from 'react'
import PropTypes from 'prop-types'

import {STATUS} from '../util/config'
import {generateCtrlId} from '../util'

import './Control.css'

function determineValueFromProps (props = {}) {
  let value = props.value
  if (!props.hasOwnProperty('value')) {
    value = props.defaultValue
  }
  // if (value == null) {
  //   value = ''
  // }
  return value
}

function determineStatusFromProps (props = {}) {
  if (props.disabled) {
    return 'disabled'
  }
  if (props.readonly) {
    return 'readonly'
  }
  return props.status || 'normal'
}

/**
 * Form.Control 表单控件基类，被 connect 使用，不能直接使用
 *
 * 被 connect 的真实控件均被本类扩充以下能力：
 *
 *  1. 布局控制，提供统一的 -label、-content、-message 容器及样式类名
 *  2. 数据管理
 *      - value 管理，读取 props.defaultValue 和 props.value 并私有化为 state.value，以 props.value 的形式提供给真实控件
 *      - rules 管理，读取 props.rules 并私有化为 this.validator，用于校验
 *      - message 管理，读取 props.message 并私有化为 state.message，可用于进行信息提示、错误呈现等使用
 *      - status 管理，私有化为 state.status，控件状态流转，将状态转为对应的样式类进行样式控制，不受外部影响
 *  3. 行为管理
 *      - validate 校验，会导致 status, message 的改变，进而导致样式和信息发生变化
 *  4. 响应句柄
 *      - onChange 读取 props.onChange 并封装，然后以 props.onChange 的形式提供给真实控件，以便进行数据同步
 *
 * @export
 * @class Control
 * @abstract
 */
export default class Control extends React.Component {
  static ctrlName = 'Control'

  /**
   * 组件接受并使用的 props 定义，所有组件的公共 props
   *
   * 注意在这里会传递给真实控件的 props 只有 id
   * 还有两个传过去的实际是 Control 接管的： value, onChange，并不是通过 props 传入的
   *
   * @static
   * @memberof Control
   *
   * @property {string} id 命名，传给真实控件，如果未传，会随机自动生成
   * @property {string} [label] 标签，私有管理
   * @property {Array|Object} [rules] 校验规则，私有管理
   * @property {any} [defaultValue] 控件默认值 私有管理
   * @property {any} [value] 控件值，私有管理
   * @property {string} [skin] 控件皮肤，可选，私有管理
   * @property {string} [status] 状态，私有管理
   * @property {string} [message] 提示信息，私有管理
   * @property {boolean} [disabled=false] 是否禁用，传给真实控件
   * @property {boolean} [readonly=false] 是否只读，传给真实控件
   * @property {string} [className] 从外部指定的自定义样式类名，私有管理
   * @property {React.CSSProperties} [style] 从外部指定的自定义样式，私有管理
   *
   * @property {function} [onChange] value 变化时的相应句柄，来自于控件使用时的自定义指定
   */
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    skin: PropTypes.string,
    status: PropTypes.string,
    message: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,

    // 会被 Form 自动灌入的事件句柄
    onChange: PropTypes.func
  }

  /**
   * Creates an instance of Control.
   * @param {any} props
   */
  constructor (props) {
    super(props)

    this.initializeState(props)
    this.generateValidator(props)
  }

  /**
   * 初始化 state
   *
   * @param {any} [props=this.props]
   * @returns
   * @memberof Control
   */
  initializeState (props = this.props) {
    this.state = {
      value: determineValueFromProps(props),
      status: determineStatusFromProps(props),
      message: props.message || '',
      isUnderControll: props.hasOwnProperty('value'),
      id: typeof props.id === 'string' ? props.id : generateCtrlId()
    }
  }

  /**
   * 根据 props.rules 生成校验使用的 validator
   *
   * @param {Object} [props=this.props] 使用的 props 数据
   */
  generateValidator (props = this.props) {
    const {rules} = props
    const {id} = this.state
    if (!rules || rules.length === 0 || Object.keys(rules).length === 0) {
      this.validator = null
    } else {
      this.validator = new AsyncValidator({
        [id]: rules || []
      })
    }
  }

  /**
   * props 被修改时的处理
   *
   * @param {Object} nextProps
   *
   */
  componentWillReceiveProps (nextProps) {
    let toUpdateState = {}
    let needValidate = false

    // rule 被修改了，更新 validator
    if ((this.props.rules && nextProps.rules && nextProps.rules.length !== this.props.rules.length) ||
      (JSON.stringify(nextProps.rules) !== JSON.stringify(this.props.rules))) {
      this.generateValidator(nextProps)
      needValidate = true
      this.setState({message: ''})
    }

    // diabled, readonly 被修改，触发状态更改
    if (nextProps.disabled !== this.props.disabled || nextProps.readonly !== this.props.readonly) {
      const status = determineStatusFromProps(nextProps)
      Object.assign(toUpdateState, {status})
    }

    // 接受 props.value 的更新并处理
    if ((nextProps.hasOwnProperty('value') && nextProps.value !== this.state.value) ||
      nextProps.defaultValue !== this.props.defaultValue) {
      Object.assign(toUpdateState, {value: determineValueFromProps(nextProps)})
      needValidate = true
    }

    if (needValidate) {
      this.selfValidate()
    }

    if (Object.keys(toUpdateState).length > 0) {
      this.setState(toUpdateState)
      return true
    }
    return false
  }

  /**
   * 当前控件是否是必填项
   *
   * @returns {bool}
   */
  isRequired () {
    const {rules} = this.props
    return rules && [].concat(rules).some(rule => rule.required)
  }

  /**
   * 控件值发生修改时的处理，传递给真实控件进行数据更新
   *
   * @method
   *
   * @param {any} value 修改后的值
   *
   * @emits {onChange} 使用时指定的值变化时的响应句柄
   */
  onChange = value => {
    const {
      onChange  // 控件被使用时传入的句柄
    } = this.props

    if (value !== this.state.value) {
      onChange && onChange(value)
    }

    if (!this.state.isUnderControll && value !== this.state.value) {
      this.setState({value})
    }
    this.selfValidate()
  }

  /**
   * 执行校验
   *
   * @method
   *
   * @param {any} [value=this.state.value]
   *
   * @returns {Promise}
   */
  validate (value = this.state.value) {
    const {id} = this.state

    if (!this.validator) {
      return
    }

    return new Promise((resolve, reject) => {
      // validation
      this.validator.validate({[id]: value}, {first: true}, (errors, fields) => {
        if (errors) {
          reject(errors)
        } else {
          resolve()
        }
      })
    }).then(() => {
      let newState = {
        status: STATUS.PASSED,
        message: ''
      }
      this.setState(newState)
      return newState
    }).catch(errors => {
      let newState = {
        status: STATUS.FAULTY,
        message: errors[0] && errors[0].message,
        id
      }
      this.setState(newState)
      throw newState
    })
  }

  /**
   * 用于值变化时的自检查，不延续 Promise 状态
   *
   * @private
   */
  selfValidate () {
    setTimeout(() => {
      let result = this.validate()
      if (result && result.catch) {
        result.catch(() => {})
      }
    })
  }

  getValue () {
    return this.state.value
  }

  setValue (v) {
    this.onChange(v)
  }

  clearValue () {
    this.onChange('')
  }

  resetValue () {
    this.onChange(this.props.defaultValue == null ? '' : this.props.defaultValue)
  }

  showMessage = message => {
    this.setState({message})
  }

  /**
   * 渲染
   *
   * @abstract
   */
  render () {
    throw new Error('DO NOT use this class directly')
  }
}
