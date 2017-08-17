import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

import Table from './'

import './Table.stories.css'

const stories = storiesOf('Table', module)

const fields = [ // array
  {
    key: 'name', // must
    title: '姓名', // must「用于表头展示 th 内容」
    content: item => {
      return <div data-command='冯杰'>{item.name}</div>
    }
    // content: 'name',
  },
  {
    key: 'age',
    title: '年龄',
    align: 'right'
    // content (item) { // content 用来渲染 td 格子，依次接受参数（lineData, row, col, data）
    //   // lineData: data 当前行的数据
    //   // row：rowNumber
    //   // col：colNumber
    //   // data 全部的数据
    //   return item.age
    // },
    // content: 'age' // 字符串用于读取 lineData 的 key
    // 如果没有 content 则以当前行 的
  }
]

// data.length 代表 tbody 行数
const data = [ // array
  {
    name: '张三',
    age: 24
  },
  {
    name: '李四',
    age: 26
  }
]

// 点击 body 内部包括 body 的任意元素，如果这个元素有 data-command 自定义属性
// 就可以触发 onCommand 回调函数，参数是：command, item, row, col, data
const command = (...d) => {
  console.log(d)
}

stories.addDecorator(withKnobs)

stories.add('Demo', () =>
  <div className='TableDemo'>
    <section>
      <h3>Demo</h3>
      <Table fields={fields} data={data} onCommand={command} />
    </section>
  </div>
)
