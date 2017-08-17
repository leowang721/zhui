import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'
import {closest} from '../util/dom'

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
 *   align: 单元格对齐方式
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

  handleBodyClick = e => {
    const {command} = e.target.dataset
    const {onCommand, data} = this.props

    if (command && onCommand) {
      const parent = closest(e.target, '.ZhuiTable-tableBodyCell')

      // 尝试获取当前的 row, col
      if (parent) {
        const {row, col} = parent.dataset
        const item = data[row]

        onCommand(command, item, row, col, data)

        e.stopPropagation()
      }
    }
  }

  getClassName (part, state) {
    return part ? getControlPartClassName('Table', part, state) : 'ZhuiTable'
  }

  getCellAlignClassName (col) {
    const {fields} = this.props
    const field = fields[col] || {}

    if (field && ALLOWED.ALIGN[field.align]) {
      return this.getClassName('tableBodyCell', field.align)
    }

    return ''
  }

  renderHead () {
    const {fields} = this.props

    return (
      <thead className={this.getClassName('tableHead')}>
        <tr>
          {fields.map((field, colIndex) =>
            <th
              className={cx(this.getCellAlignClassName(colIndex))}
              key={field.key}
            >{field.title}</th>
          )}
        </tr>
      </thead>
    )
  }

  renderBody () {
    const {fields, data = []} = this.props

    if (!data.length) {
      return null
    }

    const cols = fields.map(v => v.key)

    return (
      <tbody onClick={this.handleBodyClick} className={this.getClassName('tableBody')}>
        {data.map((item, rowIndex) =>
          <tr key={`row-${rowIndex}`}>
            {cols.map((col, colIndex) =>
              <td
                className={cx(
                  this.getClassName('tableBodyCell'),
                  this.getCellAlignClassName(colIndex)
                )}
                key={`col-${col}`} data-row={rowIndex} data-col={colIndex}
              >
                {this.getCellContent(rowIndex, colIndex)}
              </td>
            )}
          </tr>
        )}
      </tbody>
    )
  }

  getCellContent (row, col) { // 根据 行、列获取输数据「行数从 tbody 开始」
    const {fields, data} = this.props
    const field = fields[col]
    const lineData = data[row]

    if (field && lineData) {
      if (typeof field.content === 'function') {
        return field.content(lineData, row, col, data)
      }

      if (typeof field.content === 'string') {
        return lineData[field.content] || ''
      }

      return lineData[field.key]
    }

    return ''
  }

  render () {
    const {fields = []} = this.props

    if (!fields.length) {
      return null
    }

    return (
      <div className={this.getClassName()}>
        <table className={this.getClassName('table')}>
          {this.renderHead()}
          {this.renderBody()}
        </table>
      </div>
    )
  }
}
