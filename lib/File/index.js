/**
 * @file File Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'

import './index.css'

function getFileSizeDisplayString (size) {
  let unit = ['B', 'KB', 'MB', 'GB']
  let index = 0

  while (size > 1024) {
    size = size / 1024
    index++
    if (index >= unit.length) {
      break
    }
  }

  return `${size.toFixed(2)} ${unit[index]}`
}

/**
 * 文件上传组件
 *
 * @export
 * @class File
 * @extends {Component}
 */
@connectControl
export default class File extends Component {
  static ctrlName = 'File'

  /**
   * 组件支持传入的 props 定义，继承了 {@link Form.Control#propTypes} 指定的会传入真实控件的 props，故在此只介绍私有的 props
   *
   * value Item 的格式，就是 {File}，in Chrome
   * {
   *   lastModified: {number},  // 时间戳
   *   lastModifiedDate: {Date},
   *   name: {string},
   *   preview: {url},  // blob:http://localhost:8848/950809e6-f723-44b5-98df-fc2ba856f29d
   *   size: {number},
   *   type: {string},  // image/jpeg
   *   path: {?string},  // 真实地址
   * }
   *
   * @property {string} id 命名，透传自 Control
   * @property {Array.<Object>} [value] 控件值，透传自 Control
   * @property {string} [mimetypes] 文件类型约束
   * @property {number} [maxSize] 最大文件大小限制
   * @property {number} [minSize] 最小文件大小限制
   * @property {bool} [multiple=true] 是否支持多个文件
   *
   * @property {function} [onChange] 同步值变化的句柄
   * @property {function} [onUpload] 上传某个文件时的触发句柄，返回 Promise，处理上传，最终返回 File 数据
   */
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.any,
    mimetypes: PropTypes.string,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    // 事件
    onChange: PropTypes.func,
    onUpload: PropTypes.func
  }

  /**
   * 默认的 props
   *
   * @static
   * @memberof Input
   */
  static defaultProps = {
    multiple: true
  }

  constructor (props) {
    super(props)

    this.state = {
      files: this.getFilesFromProps(props)
    }
  }

  componentWillMount () {
    if (this.props.value.length !== this.state.files.length) {
      this.props.onChange(this.state.files)
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({files: this.getFilesFromProps(nextProps)})
  }

  getFilesFromProps (props = this.props) {
    const {value} = props
    let toUse = [].concat(value === '' ? [] : value)
    return this.props.multiple === false ? toUse.slice(0, 1) : toUse
  }

  getClassName (part, state) {
    return getControlPartClassName('File', part, state)
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const {onUpload} = this.props

    if (acceptedFiles.length > 0) {
      if (onUpload) {
        onUpload(acceptedFiles[0]).then(file => {
          this.addFile(file)
        }).catch(e => {
          this.props.showMessage(e instanceof Error ? '发生了未知错误，上传失败！请重新上传。' : e.message)
        })
      } else {
        this.addFile(acceptedFiles[0])
      }
    }

    if (rejectedFiles.length > 0) {
      let msg = `文件（${getFileSizeDisplayString(rejectedFiles[0].size)}） ${rejectedFiles[0].name} 被拒绝，请注意大小限制。`
      if (this.props.minSize != null) {
        msg += `最小 ${getFileSizeDisplayString(this.props.minSize)}。`
      }
      if (this.props.maxSize != null) {
        msg += `最大 ${getFileSizeDisplayString(this.props.maxSize)}。`
      }
      this.props.showMessage(msg)
    }
  }

  addFile (file) {
    let toUse = [...this.state.files]
    if (this.props.multiple === false) {
      toUse[0] = file
    } else {
      toUse = toUse.concat(file)
    }

    this.setValue(toUse)
  }

  deleteFileByIndex (index) {
    if (this.props.multiple === false) {
      this.setValue([])
    } else {
      let newFiles = [...this.state.files]
      newFiles.splice(index, 1)
      this.setValue(newFiles)
    }
  }

  setValue (files) {
    this.props.onChange(files)
  }

  getFilesView () {
    const {disabled} = this.props
    return <div className={this.getClassName('files')}>
      {this.state.files && this.state.files.length > 0
        ? (
          <ul className={this.getClassName('files', 'detail')}>
            {this.state.files.map((item, index) => (
              <li key={index}>
                <a href={item.path} target='_blank'>{item.name}</a>
                {!disabled && <a href='#' className={this.getClassName('delBtn')} onClick={e => {
                  e.preventDefault()
                  this.deleteFileByIndex(index)
                }}>删除</a>}
              </li>
            ))}
          </ul>
        )
        : (
          <div className={this.getClassName('files', 'empty')}>{disabled ? '尚未上传' : '请上传文件'}</div>
        )
      }
    </div>
  }

  render () {
    const {id, mimetypes, maxSize, minSize, disabled} = this.props

    return (
      <div className={this.getClassName('container')}>
        {this.getFilesView()}
        <div className={this.getClassName('uploader')}>
          {!disabled && <Dropzone
            inputProps={{name: id}}
            className={this.getClassName('dropzone')}
            multiple={false}
            maxSize={maxSize}
            minSize={minSize}
            disableClick={false}
            accept={mimetypes}
            onDrop={this.onDrop}
          >
            + 上传
          </Dropzone>}
        </div>
      </div>
    )
  }
}
