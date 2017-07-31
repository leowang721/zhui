/**
 * @file Pager Component
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
   * @property {string} [align='left'] 对齐
   * @property {Function} onChange 修改当前页时触发
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
    align: 'left'
  }

  constructor (props) {
    super(props)
    this.state = this.getAdjustedPageData(props)
  }

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

  getPageDetail () {
    const {totalPages} = this.state

    if (totalPages > 1) {
      return (
        <div className={this.getClassName('detail')}>
          {this.getLeftPageCtrl()}
          {this.getCenterPageCtrl()}
          {this.getRightPageCtrl()}
        </div>
      )
    }
  }

  getLeftPageCtrl () {
    const {page, totalPages} = this.state
    return (
      <div className={this.getClassName('left')}>
        <span title='第一页' key='first' data-key='first' onClick={this.changePage}>⇤</span>
        <span title='前一页' key='prev' data-key='prev' onClick={this.changePage}>⇦</span>
      </div>
    )
  }
  getRightPageCtrl () {
    const {page, totalPages} = this.state
    return (
      <div className={this.getClassName('right')}>
        <span title='下一页' key='next' data-key='next' onClick={this.changePage}>⇨</span>
        <span title='最末页' key='last' data-key='last' onClick={this.changePage}>⇥</span>
      </div>
    )
  }
  getCenterPageCtrl () {
    const {page, totalPages} = this.state
    let pages = []
    if (totalPages < 9) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(this.getSingePage(i))
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
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(this.getSingePage(i))
        }
      } else if (page < 5) {
        for (let i = 1; i <= 5; i++) {
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pages.push(this.getSingePage(i))
        }
      } else if (page > totalPages - 2) {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(this.getSingePage(i))
        }
      } else if (page > totalPages - 4) {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(this.getSingePage(i))
        }
      } else {
        for (let i = 1; i <= 2; i++) {
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot1'))
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(this.getSingePage(i))
        }
        pages.push(this.getDotPage('dot2'))
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pages.push(this.getSingePage(i))
        }
      }
    }
    return (
      <div className={this.getClassName('center')}>
        {pages}
      </div>
    )
  }

  getSingePage (pageNo) {
    const {page} = this.state
    let isCurrent = pageNo === page
    if (isCurrent) {
      return <span title={`第${pageNo}页`} key={pageNo} className={this.getClassName('current')}>{pageNo}</span>
    } else {
      return <span title={`第${pageNo}页`} key={pageNo} data-key={pageNo} onClick={this.changePage}>{pageNo}</span>
    }
  }
  getDotPage (i) {
    return <span key={i} className={this.getClassName('dot')}>...</span>
  }

  changePage = e => {
    let key = e.target.getAttribute('data-key')
    let toChange = 0;
    switch (key) {
      case 'first':
        toChange = 1;
        break;
      case 'prev':
        toChange = this.state.page - 1
        break;
      case 'next':
        toChange = this.state.page + 1
        break;
      case 'last':
        toChange = this.state.totalPages
        break;
      default:
        toChange = +key
    }
    this.props.onChange && this.props.onChange(toChange)
  }

  render () {
    const {align} = this.props

    return <div className={cx([
      this.getClassName('container'),
      this.getClassName('container', align)
    ])}>
      {this.getPageDetail()}
    </div>
  }

}