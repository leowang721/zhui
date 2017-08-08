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
    <section>
      <h3>Simple demo</h3>
      <InputNumber
        placeholder='InputNumber'
        onChange={valueChangeHandler}
        min={0}
        max={20}
        prefix='$'
        postfix='%'
      />
    </section>
    <section>
      <h3>固定 value</h3>
      <p>无论输入什么内容，在 onBlur 的时候，依旧变回初始值</p>
      <InputNumber
        value={2}
        placeholder='Fixed Value'
      />
    </section>
    <section>
      <h3>API</h3>
      <p className='tip'>「/」表示没有默认值</p>
      <table>
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>是否必需</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>
              id 和 name 公用
              <p className='tip'>如果没有传入 id，会自动生成 id</p>
            </td>
            <td>否</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>占位显示</td>
            <td>否</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>onChange</td>
            <td>值被修改的回调函数，函数接受一个参数「被修改后的值『number』」</td>
            <td>否</td>
            <td>function</td>
            <td>/</td>
          </tr>
          <tr>
            <td>className</td>
            <td>自定义类名</td>
            <td>否</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>style</td>
            <td>自定义样式</td>
            <td>否</td>
            <td>object</td>
            <td>/</td>
          </tr>
          <tr>
            <td>precision</td>
            <td>数值精度，即小数点后面最多多少位，多余的会四舍五入</td>
            <td>否</td>
            <td>unmber</td>
            <td>/</td>
          </tr>
          <tr>
            <td>min</td>
            <td>控件允许输入最小值</td>
            <td>否</td>
            <td>number</td>
            <td>-Infinity</td>
          </tr>
          <tr>
            <td>max</td>
            <td>控件允许输入最大值</td>
            <td>否</td>
            <td>number</td>
            <td>Infinity</td>
          </tr>
          <tr>
            <td>step</td>
            <td>每次改变步数，可以为小数</td>
            <td>否</td>
            <td>number</td>
            <td>1</td>
          </tr>
          <tr>
            <td>value</td>
            <td>
              控件显示的值
              <p className='tip'>value 传入固定值，则需要通过 onChange 获取改变的值后，通过 props.value 再传进去。<br /> 否则展示的值在 blur 事件会回到初始值</p>
            </td>
            <td>否</td>
            <td>number</td>
            <td>/</td>
          </tr>
          <tr>
            <td>defaultValue</td>
            <td>控件显示初始值</td>
            <td>否</td>
            <td>number</td>
            <td>/</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>禁用</td>
            <td>否</td>
            <td>bool</td>
            <td>/</td>
          </tr>
          <tr>
            <td>prefix</td>
            <td>前缀「比如：￥、$」</td>
            <td>否</td>
            <td>string</td>
            <td>/</td>
          </tr>
          <tr>
            <td>postfix</td>
            <td>后缀「比如：%」</td>
            <td>否</td>
            <td>string</td>
            <td>/</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
)
