import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import {getControlPartClassName} from '../util'

import './index.css'

/**
 * Pager 组件
 *
 * 指定 page, perPage, totalCount 三个属性计算分页信息
 * 展现链接，点击时触发 props.onChange
 *
 * @export
 * @class Pager
 * @extends {Component}
 */
export default class Pager extends Component {
  static ctrlName = 'Pager'

  /**
   * 组件支持传入的 props 定义
   *
   * @property {number} [page=1] 当前页
   * @property {number} perPage 每页数量
   * @property {number} [totalCount=0] 数据总量
   * @property {string} [align='center'] 对齐
   * @property {function} onChange 修改当前页时触发
   */
  static propTypes = {
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalCount: PropTypes.number,
    align: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    page: 1,
    perPage: 10,
    totalCount: 0,
    align: 'center'
  }

  state = this.getAdjustedPageData()

  componentWillReceiveProps (nextProps) {
    this.setState(this.getAdjustedPageData(nextProps))
  }

  getAdjustedPageData (props = this.props) {
    // 数据初始化修正
    let page = props.page < 1 ? 1 : props.page
    let perPage = props.perPage < 1 ? 1 : props.perPage
    let totalCount = props.totalCount < 0 ? 0 : props.totalCount

    // 计算修正
    let totalPages = Math.ceil(totalCount / perPage)
    if (page > totalPages) {
      page = totalPages
    }
    // 保存
    return {page, perPage, totalCount, totalPages}
  }

  getClassName (part, state) {
    return getControlPartClassName('Pager', part, state)
  }

  getDotPage (i) {
    return <span key={i} className={this.getClassName('dot')}>...</span>
  }

  handlePage = e => {
    let key = e.target.getAttribute('data-key')
    let toChange = 0
    switch (key) {
      case 'first':
        toChange = 1
        break
      case 'prev':
        toChange = this.state.page - 1
        break
      case 'next':
        toChange = this.state.page + 1
        break
      case 'last':
        toChange = this.state.totalPages
        break
      default:
        toChange = +key
    }
    if (toChange >= 1 && toChange <= this.state.totalPages) {
      this.props.onChange && this.props.onChange(toChange)
    }
  }

  renderSinglePage (pageNumber) {
    return pageNumber === this.state.page
      ? <span key={pageNumber} className={this.getClassName('current')}>{pageNumber}</span>
      : <span key={pageNumber} data-key={pageNumber} onClick={this.handlePage}>{pageNumber}</span>
  }

  renderPage () {
    const {page, totalPages} = this.state
    let pages = []

    if (totalPages < 9) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(this.renderSinglePage(i))
      }
    } else {
      // 大体这么渲染
      // [1] 2 3 ... 8 9
      // 1 [2] 3 ... 8 9
      // 1 2 [3] 4 5 ... 8 9
      // 1 2 3 [4] 5 ... 8 9
      // 1 2 ... 4 [5] 6 ... 8 9
      // 1 2 ... 5 [6] 7 8 9
      // 1 2 ... 6 [7] 8 9
      // 1 2 ... 7 [8] 9
      // 1 2 ... 7 8 [9]

      // 懒得花时间弄算法了，直接 if else
      if (page < 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(this.renderSinglePage(i))
        }
      } else if (page < 5) {
        for (let i = 1; i <= 5; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pages.push(this.renderSinglePage(i))
        }
      } else if (page > totalPages - 2) {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(this.renderSinglePage(i))
        }
      } else if (page > totalPages - 4) {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(this.renderSinglePage(i))
        }
      } else {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(this.renderSinglePage(i))
        }
        pages.push(this.getDotPage('dot2'))
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pages.push(this.renderSinglePage(i))
        }
      }
    }

    return (
      <div className={this.getClassName('center')}>
        {pages}
      </div>
    )
  }

  render () {
    const {page, totalPages} = this.state

    if (totalPages < 1) {
      return null
    }

    const prevDisableClassName = page < 2 && this.getClassName('disabled')
    const nextDisableClassName = page === totalPages && this.getClassName('disabled')

    return (
      <div
        className={cx(
          this.getClassName(),
          this.getClassName(null, this.props.align)
        )}
      >
        <span
          className={cx(this.getClassName('first'), prevDisableClassName)}
          key='first' data-key='first' onClick={this.handlePage}
        >第一页</span>
        <span
          className={cx(prevDisableClassName)}
          key='prev' data-key='prev' onClick={this.handlePage}
        >上一页</span>
        {this.renderPage()}
        <span
          className={cx(nextDisableClassName)}
          key='next' data-key='next' onClick={this.handlePage}
        >下一页</span>
        <span
          className={cx(this.getClassName('last'), nextDisableClassName)}
          key='last' data-key='last' onClick={this.handlePage}
        >最后一页</span>
      </div>
    )
  }
}
