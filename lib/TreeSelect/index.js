/**
 * @file TreeSelect Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import connectControl from '../Form/connectControl'
import {getControlPartClassName} from '../util'
import Radio from '../Radio'

import './index.css'

const ICON = [
  <span className='checkIcon'>&nbsp;</span>,
  <span className='checkIcon partChecked'><i>-</i></span>,
  <span className='checkIcon checked'><i>✓</i></span>
]

class TreeData {
  constructor (data) {
    this.setData(data)
  }

  setData (data = []) {
    this._mapper = {
      byId: {},
      byLevel: {}
    }
    this.treeData = processTreeData(data, this._mapper)
    this.depth = Object.keys(this._mapper.byLevel).length
  }

  get (id) {
    return id != null && this._mapper.byId[id]
  }

  getDataByLevel = level => {
    return this.getIdsByLevel(level).map(id => this._mapper.byId[id])
  }

  getIdsByLevel = level => {
    return [...this._mapper.byLevel[level]]
  }

  getChildrenById = id => {
    return this._mapper.byId[id] ? this._mapper.byId[id].children : []
  }

  getLeavesData = (level = this.depth) => {
    let result = this.getIdsByLevel(level)
    while (--level) {
      result = result.concat(
        this.getIdsByLevel(level).filter(id => (!this.get(id).children || this.get(id).children.length === 0))
      )
    }
    return result
  }

  getSubTreeLeavesData = (rootId, level = this.depth) => {
    let root = this.get(rootId)
    if (!root) {
      return []
    }
    let children = [root]
    let currLevel = root.level
    while (currLevel <= level) {
      children = children.reduce((prev, curr) => prev.concat(curr.children && curr.children.length > 0 ? curr.children : curr), [])
      currLevel++
    }
    return children.map(item => item.id)
  }

  getSelectedStatus (id) {  // 0 未选，1 半选，2 全选
    let item = this.get(id)
    return item ? item.selected : 0
  }

  select (id) {
    let current = this.get(id)
    if (current && !current.selected) {
      current.selected = 2  // 直接 select 必是全选
      let parent = this.get(current.parent)
      while (parent) {
        parent.selected = parent.children.some(item => item.selected === 0 || item.selected === 1) ? 1 : 2
        parent = this.get(parent.parent)
      }
    }
  }

  unselect (id) {
    let current = this.get(id)
    if (current && current.selected) {
      current.selected = 0
      let parent = this.get(current.parent)
      while (parent) {
        if (parent.selected) {
          parent.selected = parent.children.some(item => item.selected === 2 || item.selected === 1) ? 1 : 0
        }
        parent = this.get(parent.parent)
      }
    }
  }
}

function processTreeData (treeData, mapper, parentId) {
  if (!treeData || treeData.length > 0) {
    let newTreeData = []
    for (let i = 0; i < treeData.length; i++) {
      let current = {...treeData[i]}
      Object.assign(current, {
        selected: 0  // 0 未选，1 半选，2全选
      })
      if (parentId) {
        current.parent = parentId
      }
      if (current.children && current.children.length > 0) {
        current.children = processTreeData(current.children, mapper, current.id)
        current.hasChildren = true
      }
      mapper.byId[current.id] = current
      mapper.byLevel[current.level] = mapper.byLevel[current.level] || []
      mapper.byLevel[current.level].push(current.id)
      newTreeData.push(current)
    }
    return newTreeData
  }
}

/**
 * TreeSelect 定制的树状复选
 *
 * 接受的 treeData 数据格式，大致如此
 * [
 *   {
 *     id: 150000,
 *     name: '内蒙古',
 *     level: 1,
 *     children: [
 *       {
 *         id: 102,
 *         name: '服饰',
 *         level: 2
 *       },
 *       {
 *         id: 103,
 *         name: '美食',
 *         level: 2
 *       }
 *     ]
 *   }
 * ]
 *
 * @export
 * @class TreeSelect
 * @extends {Component}
 */
@connectControl
export default class TreeSelect extends Component {
  static ctrlName = 'TreeSelect'

  static propTypes = {
    onChange: PropTypes.func,
    treeData: PropTypes.array,
    level: PropTypes.number,  // 取值及展现的层级，展现至此级，只取此级的数据
    defaultDetailSelected: PropTypes.bool  // 默认的切换至 detail 时 所有项是否选中
  }

  static defaultProps = {
    defaultDetailSelected: false,
    allLang: '全部',
    detailLang: '详细'
  }

  constructor (props) {
    super(props)
    this.state = {
      value: Array.isArray(props.value) ? props.value : [],
      chosenByLevel: {},
      treeData: new TreeData(props.treeData)
    }
    this.state.mode = this.state.value.length === 0 ? 'all' : 'detail'
    this.state.level = this.props.level == null ? this.state.treeData.depth : this.props.level
    this.adjustTreeSelected()
  }

  componentWillReceiveProps (nextProps) {
    let toUpdate = {}
    let toUnSelect
    let toSelect

    let needAdjust = false
    if (nextProps.treeData !== this.props.treeData) {
      toUpdate.treeData = new TreeData(nextProps.treeData)
      toUpdate.level = Math.min(this.state.level, toUpdate.treeData.depth)
      needAdjust = true
    }
    if (nextProps.value !== this.props.value) {
      toUpdate.value = Array.isArray(nextProps.value) ? nextProps.value : []

      toUnSelect = [...this.state.value]
      toSelect = [...toUpdate.value]
      needAdjust = true

      // toUpdate.mode = toUpdate.value.length === 0 ? 'all' : 'detail'
    }

    if (nextProps.level != null) {
      toUpdate.level = Math.min(nextProps.level, (toUpdate.treeData || this.state.treeData).depth)
    }

    this.setState(toUpdate)
    if (needAdjust) {
      setTimeout(() => {
        toUnSelect && toUnSelect.length > 0 && this.adjustTreeUnselected(toUnSelect)
        toSelect && toSelect.length > 0 && this.adjustTreeSelected(toSelect)
        // force update
        this.setState({chooseLevel: {...this.state.chosenByLevel}})
      }, 10)
    }
  }

  adjustTreeSelected (value = this.state.value) {
    value.forEach(id => {
      this.state.treeData.select(id)
    })
  }
  adjustTreeUnselected (value = []) {
    value.forEach(id => {
      this.state.treeData.unselect(id)
    })
  }

  chooseLevel (level, id) {
    this.setState({chosenByLevel: {...this.state.chosenByLevel, [level]: id}})
  }

  select (id) {
    const toSelect = this.state.treeData.getSubTreeLeavesData(id)
    const newSet = new Set([...this.state.value, ...toSelect])
    this.props.onChange([...newSet])
  }
  unselect (id) {
    const toUnselect = this.state.treeData.getSubTreeLeavesData(id)
    this.props.onChange([...this.state.value.filter(i => !toUnselect.includes(i))])
  }
  toggle (id) {
    let item = this.state.treeData.get(id)
    if (item.selected) {
      this.unselect(id)
    } else {
      this.select(id)
    }
  }

  switchMode = () => {
    let newMode = this.state.mode === 'all' ? 'detail' : 'all'
    // let newValue = newMode === 'all' ? [] : this.state.treeData.getLeavesData(this.state.level)
    let newValue = []
    if (newMode === 'detail' && this.props.defaultDetailSelected) {
      newValue = this.state.treeData.getLeavesData(this.state.level)
    }
    this.setState({
      mode: newMode
    })
    this.props.onChange(newValue)
  }

  getClassName (part, state) {
    return getControlPartClassName('TreeSelect', part, state)
  }

  getSubLevelView () {
    const {level} = this.state
    const depth = Math.min(this.state.treeData.depth, level)
    let view = []
    if (depth > 1) {
      for (let i = 1; i < depth; i++) {
        let currentChosenItem = this.state.treeData.get(this.state.chosenByLevel[i])
        if (currentChosenItem && currentChosenItem.children && currentChosenItem.children.length > 0) {
          view.push(<ul key={i}>
            {currentChosenItem.children.map(item => this.getItemView(item))}
          </ul>)
        }
      }
    }
    return view
  }

  getItemView (item) {
    let currentLevelChosen = this.state.treeData.get(this.state.chosenByLevel[item.level])
    return (
      <li key={item.id} className={currentLevelChosen && currentLevelChosen.id === item.id ? 'current' : ''}
        onClick={() => {
          this.chooseLevel(item.level, item.id)
        }}>
        <span onClick={e => {
          this.toggle(item.id)
          e.preventDefault()
          e.stopPropagation()
        }}>{ICON[this.state.treeData.getSelectedStatus(item.id)]}</span>
        {item.name}
      </li>
    )
  }

  render () {
    const {allLang, detailLang} = this.props
    return (
      <div className={this.getClassName()}>
        <div className={this.getClassName('header')}>
          <Radio onChange={this.switchMode} defaultValue='all' value={this.state.mode}>
            <Radio.Option value='all'>{allLang}</Radio.Option>
            <Radio.Option value='detail'>{detailLang}</Radio.Option>
          </Radio>
        </div>
        {this.state.mode === 'detail' && <div className={this.getClassName('detail')}>
          <ul>
            {this.state.treeData.getDataByLevel(1).map(item => this.getItemView(item))}
          </ul>
          {this.getSubLevelView()}
        </div>}
      </div>
    )
  }
}
