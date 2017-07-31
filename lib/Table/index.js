/**
 * @file Table Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import once from 'lodash/once'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import Popup from '../Popup'
import Button from '../Button'

import './index.css'

const ALLOWED = {
  ALIGN: {
    left: 1,
    right: 1,
    center: 1
  }
}

/**
 * Table 组件
 *
 * 配置 fields 即列，子项说明：
 *   key: 即对应的数据 field
 *   align: 单元格对齐方式，默认是 center
 *   title: 表头信息
 *   content: 数据单元格信息，如果没有，则使用 lineData[key]，如果是字符串，当做 key 使用，如果是方法，则使用其调用返回
 * data 是数据
 *
 * 支持 command，可以传入 onCommand，参数依次为 commandName, lineData, row, col, listData
 * command的触发模式是，单元格中的元素具有 data-command 属性，指定了 commandName
 *
 * @export
 * @class Table
 * @extends {Component}
 */
export default class Table extends Component {
  static ctrlName = 'Table'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {Array.<Object>} fields 列配置
   * @property {Array.<Object>} data 数据
   */
  static propTypes = {
    fields: PropTypes.array,
    data: PropTypes.array
  }

  onTableBodyClick = e => {
    let command = e.target.getAttribute('data-command')

    if (command) {
      // 尝试获取当前的 row, col
      // 先获取所在的td
      let parent = e.target.parentNode
      while (parent && parent.nodeType === 1 && parent.tagName.toLowerCase() !== 'td') {
        parent = parent.parentNode
      }
      if (parent) {
        let row = parent.getAttribute('data-row')
        let col = parent.getAttribute('data-col')
        let item = this.props.data[row]

        this.props.onCommand && this.props.onCommand(command, item, row, col, this.props.data)
        e.preventDefault()
        e.stopPropagation()
      }
    }
  }

  getClassName (part, state) {
    return getControlPartClassName('Table', part, state)
  }

  getCellContent (row, col) {
    const {fields = [], data = []} = this.props
    const field = fields[col]
    const lineData = data[row]

    if (field && lineData) {
      if (typeof field.content === 'function') {
        return field.content(lineData, row, col, data)
      } else if (typeof field.content === 'string') {
        return lineData[field.content] || ''
      }
      return lineData[field.key]
    }

    return ''
  }

  getCellAlignClassName (col) {
    const {fields = []} = this.props
    const field = fields[col] || {}

    if (field && ALLOWED.ALIGN[field.align]) {
      return this.getClassName('tableBodyCell', field.align)
    }

    return this.getClassName('tableBodyCell', 'center')
  }

  getHeadView () {
    const {fields = []} = this.props

    return (
      <tbody>
        <tr className={this.getClassName('tableHead')}>
          {fields.map(field => (
            <th key={field.key} className={this.getClassName('tableHeadCell')}>
              {field.title}
            </th>
          ))}
        </tr>
      </tbody>
    )
  }

  getBodyView () {
    const {fields = [], data = []} = this.props
    let fieldsArr = fields.map(f => f.key)
    return (
      <tbody onClick={this.onTableBodyClick}>
        {data.map((item, rowIndex) => (
          <tr key={`row-${rowIndex}`} className={this.getClassName('tableBodyRow')}>
            {fieldsArr.map((field, colIndex) => (
              <td key={`cell-${rowIndex}-${colIndex}`} data-row={rowIndex} data-col={colIndex} className={cx([
                this.getClassName('tableBodyCell'),
                this.getCellAlignClassName(colIndex)
              ])}>
                {this.getCellContent(rowIndex, colIndex)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }

  render () {
    return (
      <div className={this.getClassName('container')}>
        <table className={this.getClassName('table')}>
          {this.getHeadView()}
          {this.getBodyView()}
        </table>
      </div>
    )
  }
}
