/**
 * @file Example Simple Container
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Button, Select} from 'zhui'

import formActions from '../../actions/form'

import './Button.css'

@connect(
  state => ({
    isRelatedDisabled: state.form.isRelatedDisabled
  }),
  dispatch => ({
    actions: bindActionCreators(formActions, dispatch)
  })
)
export default class UIButton extends Component {
  static propTypes = {}
  state = {}
  componentWillMount () {}
  componentWillReceiveProps (nextProps) {}

  onClick (e) {
    window.alert(`你点击了按钮：${e.target.innerText}`)
  }

  switchDisabled = e => {
    const {actions} = this.props
    actions.switchRelatedDisabled()
  }

  render () {
    const {isRelatedDisabled} = this.props
    return (
      <div className='ButtonDemo'>
        <h2>Button</h2>
        <div>
          <h3>按钮类型及 skin</h3>
          <Button id='btn1-1' onClick={this.onClick}>默认按钮</Button>
          <Button id='btn1-2' onClick={this.onClick} skin='primary'>skin=primary</Button>
          <Button id='btn1-3' onClick={this.onClick} skin='dashed'>skin=dashed</Button>
          <Button id='btn1-4' onClick={this.onClick} skin='danger'>skin=danger</Button>
          <Button id='btn1-5' onClick={this.onClick} skin='link'>skin=Link</Button>
          <p>对应的 disabled</p>
          <Button id='btn1-1-1' disabled onClick={this.onClick}>默认按钮</Button>
          <Button id='btn1-2-1' disabled onClick={this.onClick} skin='primary'>skin=primary</Button>
          <Button id='btn1-3-1' disabled onClick={this.onClick} skin='dashed'>skin=dashed</Button>
          <Button id='btn1-4-1' disabled onClick={this.onClick} skin='danger'>skin=danger</Button>
          <Button id='btn1-5-1' disabled onClick={this.onClick} skin='link'>skin=Link</Button>
        </div>
        <div>
          <h3>关联禁用</h3>
          <Button id='btn2-1' onClick={this.switchDisabled}>Switch Disabled</Button>
          <Button id='btn2-2' onClick={this.onClick} disabled={isRelatedDisabled}>关联按钮</Button>
        </div>
        <div>
          <h3>Icon Button</h3>
          <p>可以直接嵌入，但注意嵌入内容不受控制，要考虑浏览器支持等实际状况，暂时没搞内置的 icon ...</p>
          <Button id='btn3-1' onClick={this.onClick}>☺ 表情文字按钮</Button>
          <Button id='btn3-2' onClick={this.onClick}>
            <svg style={{
              width: 18,
              height: 18,
              verticalAlign: 'middle',
              fill: 'currentColor',
              overflow: 'hidden',
              position: 'relative',
              top: -3,
              marginRight: 3
            }} viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <path d='M647.786667 845.397333c-76.053333-24.234667-157.248-76.266667-240.917334-163.648-81.152-84.757333-131.626667-164.864-157.504-238.442666-16.832-47.829333-21.056-85.546667-18.581333-111.402667a50.986667 50.986667 0 0 1 0.384-3.221333l0.341333-3.349334c0.469333-18.112 10.922667-46.144 22.122667-59.264a414.677333 414.677333 0 0 1 34.56-39.466666c9.834667-9.877333 19.306667-18.133333 27.946667-24.192 12.885333-9.045333 21.162667-11.328 23.317333-10.069334-0.213333 0.021333 1.045333 1.322667 2.837333 3.776 3.157333 4.288 7.082667 10.517333 11.669334 18.410667a1030.4 1030.4 0 0 1 31.04 59.264 3473.109333 3473.109333 0 0 1 58.368 126.229333c1.706667 3.84 0.938667 12.309333-1.344 15.722667l-47.04 69.824a27.52 27.52 0 0 0-3.370667 7.424c-7.509333 25.92 12.309333 66.517333 73.834667 129.216 37.504 38.186667 70.293333 63.061333 98.496 77.077333 18.944 9.429333 33.28 12.8 42.730666 12.586667 4.48-0.192 8.256-1.450667 11.52-3.626667l69.546667-46.933333c3.584-2.410667 12.416-3.349333 16.533333-1.685333l8.704 3.477333a3178.794667 3178.794667 0 0 1 91.477334 38.464c7.04 3.114667 13.802667 6.144 20.266666 9.088 21.76 9.962667 39.637333 18.773333 52.629334 25.984 6.784 3.797333 12.074667 7.061333 15.573333 9.642667 1.429333 1.066667 2.432 1.877333 2.901333 2.346666a10.602667 10.602667 0 0 1-2.197333-3.968l1.472 3.2c4.522667 8.064-16.853333 38.122667-51.562667 68.714667a626.624 626.624 0 0 1-20.544 17.344 21.333333 21.333333 0 1 0 26.453334 33.450667 669.056 669.056 0 0 0 22.293333-18.794667c52.48-46.293333 80.661333-85.866667 60.544-121.642667l1.472 3.2c-6.037333-16.64-32.277333-31.274667-91.306667-58.261333-6.613333-3.050667-13.546667-6.144-20.736-9.322667a2876.629333 2876.629333 0 0 0-101.610666-42.538666c-17.109333-6.912-40.874667-4.416-56.234667 5.930666l-69.546667 46.933334 10.922667-3.626667c0.576-0.021333-0.554667-0.149333-2.986667-0.725333a92.693333 92.693333 0 0 1-19.306666-7.424c-23.68-11.776-52.693333-33.792-87.04-68.778667-51.797333-52.757333-65.322667-80.490667-63.317334-87.445333a16.021333 16.021333 0 0 1-1.92 4.074666l46.741334-69.376c10.474667-15.573333 12.586667-39.530667 5.013333-56.725333l-4.138667-9.365333a3937.258667 3937.258667 0 0 0-46.122666-100.202667c-3.029333-6.293333-5.973333-12.416-8.874667-18.304-30.997333-63.082667-48.512-93.290667-64.213333-100.48-18.922667-11.157333-42.261333-4.672-67.456 12.992-10.922667 7.658667-22.186667 17.472-33.642667 28.970667a456.597333 456.597333 0 0 0-37.610667 42.88c-16.853333 19.712-30.805333 57.173333-31.509333 84.906666l0.341333-3.349333c-0.277333 1.493333-0.597333 3.797333-0.896 6.954667-3.050667 31.893333 1.877333 75.818667 20.821334 129.621333 27.946667 79.466667 81.664 164.736 166.912 253.781333 88.490667 92.416 175.765333 148.330667 258.773333 174.805334 27.797333 8.853333 53.888 13.952 77.973333 15.957333a21.333333 21.333333 0 0 0 3.52-42.517333 310.570667 310.570667 0 0 1-68.522666-14.08z' fill='#3D3D3D' />
            </svg>
            SVG 按钮
          </Button>
          <Button id='btn3-3' onClick={this.onClick}>
            <i className='fa fa-bolt' aria-hidden='true' />
            font-awesome 按钮
          </Button>
          <Button id='btn3-4' onClick={this.onClick}>
            <i className='fa fa-spinner fa-pulse fa-fw' aria-hidden='true' />
            font-awesome 动画按钮
          </Button>
          <p>
            PS：SVG 默认的不能自动变色，没处理。
          </p>
        </div>
        <div>
          <h3>Button Group</h3>
          <Button.Group>
            <Button id='btn4-1' onClick={this.onClick}>L</Button>
            <Button id='btn4-2' onClick={this.onClick}>M</Button>
            <Button id='btn4-3' onClick={this.onClick}>R</Button>
          </Button.Group>
        </div>
        <div>
          <h3>Loading Button</h3>
          TO DO，需要 Icon
        </div>
        <div>
          <h3>Button Shape</h3>
          要不要做呢？例如圆形按钮这种。
        </div>
        <div className='SelectDemo'>
          <div className="SimpleSelect">
            <Select id="ui1-1" defaultValue={'1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街aa位附近我耳机佛今儿我无法访问11'}>
              <li value={1}>1挤我耳机佛教我耳机覅偶文件诶of加尔文为欧风街无法访问11</li>
              <li value={2}>222</li>
              <li value={3}>333</li>
              <li value={4}>444</li>
              <li value={5}>jiowejfiojweiofjioewjfiuajweiuriuweiurhiwehfiuwhiuefhuiwahfiu</li>
            </Select>
            <Button id='ui1-3'>啊啊啊</Button>
          </div>
        </div>
      </div>
    )
  }
}
