import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'

import InputNumber from './'

import './Input.stories.css'

const valueChangeHandler = action('value-changed')
const stories = storiesOf('InputNumber', module)

stories.addDecorator(withKnobs)

stories.add('Demo & API', () =>
  <div className='InputNumberDemo'>
    <div>
      <p className='tip'>
        如果你通过 props.value 控制 value，那么你需要通过 onChange 获取改变的值后，通过 props.value 再传进去，否则值不会再改变
      </p>
      <h3>Simple demo</h3>
      <InputNumber
        id='number-id'
        placeholder='InputNumber'
        onChange={valueChangeHandler}
        min={0}
        max={20}
        defaultValue={2}
      />
      <InputNumber
        id='number-id'
        placeholder='InputNumber'
        onChange={valueChangeHandler}
        min={0}
        max={20}
        value={2}
      />
      <h3>API</h3>
      <table>
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>id 和 name 公用</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位显示</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td>值被修改的回调函数，参数是被修改后的值</td>
            <td>function</td>
            <td>/</td>
          </tr>
          <tr>
            <td>precision</td>
            <td>数值精度，即小数点后面最多多少位，多余的会四舍五入</td>
            <td>unmber</td>
            <td>/</td>
          </tr>
          <tr>
            <td>min</td>
            <td>控件允许输入最小值</td>
            <td>number</td>
            <td>-Infinity</td>
          </tr>
          <tr>
            <td>max</td>
            <td>控件允许输入最大值</td>
            <td>number</td>
            <td>Infinity</td>
          </tr>
          <tr>
            <td>step</td>
            <td>每次改变步数，可以为小数</td>
            <td>number</td>
            <td>1</td>
          </tr>
          <tr>
            <td>value</td>
            <td>控件显示的值</td>
            <td>number</td>
            <td>/</td>
          </tr>
          <tr>
            <td>defaultValue</td>
            <td>控件显示初始值</td>
            <td>number</td>
            <td>/</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>禁用</td>
            <td>bool</td>
            <td>/</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)
