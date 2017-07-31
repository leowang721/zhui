# 商业组 ui 组件

## 表单类

表单类 UI 是前端 UI 库中最重要的组成部分，它影响到系统中所有跟用户交互有关的功能体验。

### 控件列表

实现各级控件，列表如下：

| 状态 | ID             | 名称       | 说明                                                           | 开发    |
|------|----------------|------------|----------------------------------------------------------------|---------|
| 👍   | Form           | 表单       | 表单整体                                                       | Leo     |
| 👍   | Form.Contrl    | 表单项     | 单个表单封装，使用 HOC，不直接使用此控件                            | Leo     |
| 👍   | Form.Group     | 表单项组   | 对表单项进行分组，可进行整体布局控制                                | Leo     |
| 👍   | Button         | 按钮组     | 按钮                                                          | Leo     |
| 👍   | Button.Group   | 按钮       | 仅仅是个展现效果而已，支持使用布局                                 | Leo     |
| 👍   | Input          | 文本输入   | 文本输入框，支持单行、多行                                        | Leo     |
| 👍   | Input.Inline   | 行内文本修改 | 行内修改的文本输入框                                           | Leo     |
|      | Input.Group    | 文本输入组 | 多个输入框的展现形式控制                                          |         |
|      | Input.Number   | 数字输入   | 数字输入框                                                     |         |
|      | Input.Range    | 范围输入   | 范围输入框，这个考虑一下要不要跟 Number 合并                        |         |
| 👍   | Radio          | 单选       | 供 Select 使用的选项                                           | Leo     |
| 👍   | CheckBox       | 复选       | 供 Select 使用的选项                                           | Leo     |
| 👍   | Select         | 下拉选择框  | 下拉选择框，会更新选项                                            | Leo     |
| 👍   | Select.Index   | 行内选择修改 | 行内修改模式的，下拉选择框，会更新选项                              | Leo     |
| 👍   | Select.Filter  | 下拉筛选选择 | 支持筛选模式的，下拉选择框，会更新选项                              | Leo     |
|      | DropDown       | 下拉执行   | 下拉执行，不更新选项                                             |         |
| 👍   | Option         | 可选项     | Select、Radio、CheckBox 使用的选项，分别实现                      | Leo     |
| 👍   | DatePicker     | 日期选择   | 日期选择                                                        | Leo     |
| 👍   | DatePicker.Range | 日期范围选择 | 日期范围选择                                                 | Leo     |
| 👍   | Popup          | 弹出层     | 弹出层                                                         | Leo     |

### 调用示例

期望在开发一个表单，代码大致如此：

```javascript
import {Form, Button, Input} from 'zhui'

class SomeForm extends React.Component {
  handleSubmit = formData => { /* do sth with formData */ }
  render() {
    const {formData} = this.props
    return (
      <Form layout="inline" onSubmit={e => this.handleSubmit(e)}>
        <Form.Group legend="登录框" layout="vertical">
          <Input type="text" name="username" label="用户名：" placeholder="请输入用户名" icon="user" rules=[{type: 'required', message: '用户名不能为空'}] />
          <Input type="password" name="password" label="密码" placeholder="请输入密码" icon="password" />
        </Form.Group>
        <CheckBox name="rememberMe" value="on" label="记住我" checked />
        <Button type="submit">登录</Button>
      </Form>
    )
  }
}
```

此外，表单后续定会支持 动态创建，即根据配置自动生成表单

### 单个控件

每个表单控件，都可以被 Form.Control 接管，这意味着可以进行：

 * 布局控制
     * 支持布局管理：Horizontal, Vertical, Inline
     * 支持 Label
     * 支持自动的样式生成： ZhuiFormCtrl ZhuiFormCtrl--is-normal ZhuiFormInput ZhuiFormInput--is-normal
 * 状态管理
 * 校验支持

期望被 Form.Control 接管的控件，只需在定义时：

```javascript
import connectControl from '../Form/connectControl'

// 在此使用 decorator
@connectControl
export default class Input {
...
```

#### 核心属性

 * id 控件命名，必需
 * label 标签
 * rules 校验规则
 * defaultValue 默认值
 * skin 皮肤

以下是不建议直接指定的属性、方法，如在 Form 中，其实是被 Form 接管了的。
仅在不想用 Form 自动接管，而是手动管理对应数据（修改后响应保存，再通过 props 传入）时可自行指定。

 * value 取值，如果整体在 Form 内，此时的 value 实际上是被 Form 接管了，修改无效
 * status 状态
 * message 消息
 * onValueChange 值修改时的响应句柄，可指定自定义的，这个会被处理调用

#### 布局控制

被 Form.Control 接管的表单控件，会自动生成以下布局：

```javascript
<Form.Control class="ZhuiFormCtrl ZhuiFormCtrl--is-normal ZhuiInput ZhuiInput--is-normal">
  <!-- label 可能没有 -->
  <label class="ZhuiFormCtrl-label ZhuiFormCtrl-label--is-normal"></label>
  <div class="ZhuiFormCtrl-content ZhuiFormCtrl-content--is-normal">
    <Input />
    <div class="ZhuiFormCtrl-message"></div>
  </div>
</Form.Control>
```

其中：
 * ZhuiFormCtrl 用于整体布局控制，会被祖先节点的 .ZhuiHorizontal, .ZhuiVertical, .ZhuiInline 控制布局效果
 * ZhuiInput 是控件自身样式类，多用于控件实现时的具体样式控制
 * -label, -content, -message 是控件的三个部分，用于布局控制
 * --is-${status} 则是针对于不同状态的样式控制，多着重于颜色

在真实样式控制上需注意：

 * 当前是通过 WrappedComponent.name 来获取控件名，可能有兼容问题，如有，会修改为使用 decorator 传入指定
 * 样式声明时，使用 .ZhuiInput 这般的类名作为样式声明最外层
 * rules 属性会导致控件下部留白预留错误信息提示的位置

#### 皮肤机制

控件允许传入属性 skin 生成皮肤样式类名，固定格式为 `Zhui${Control}Skin${Skin}` 这里传入的 skin 会被转成首字母大写。

例如 `ZhuiButtonSkinPrimary`

已应用于 Button，其他控件默认支持的。

#### 状态流转

暂时只设了这几种状态：
normal, disabled, readonly, faulty, passed

而且没有做专门的状态管理类来处理，基本流转原则是：

 1. 默认是 normal
 2. disabled, readonly 属性会导致状态改变为对应状态，覆盖之前的状态
 3. 输入触发的校验会导致状态变为 passed 或 faulty

会自动生成样式类名：`Zhui${Control}--is-${state}`

因为已经有 state 了，所以暂时先叫 status。
state倾向于condition，是一种延续性的状态。status常用于描述一个过程中的某阶段（phase）。也算应景。

#### 校验处理

当前使用 async-validator 库进行校验数据处理，暂时不自行实现。

##### rules 属性

可以为每个控件指定属性 rules，如果这个控件已被 @connectControl 处理了，则 rules 生效，可以触发自动校验。

基础校验行为就是取 props.value, props.rules 结合 async-validator 使用，获得校验结果，触发 status change。

```javascript
// 一个表单元素的规则配置示例，Array | Object
[
  {required: true, message: '不能为空'}  // 这里是否要支持自动 format 呢？如 '${name}不能为空'
]
```

##### 规则的数据格式

| 参数       | 说明                                    | 类型                                    | 默认值   |
|------------|-----------------------------------------|-----------------------------------------|----------|
| message    | 校验文案                                | string                                  | -        |
| type       | 内建校验类型，可选项                    | string                                  | 'string' |
| required   | 是否必选                                | boolean                                 | false    |
| whitespace | 必选时，空格是否会被视为错误            | boolean                                 | false    |
| len        | 字段长度                                | number                                  | -        |
| min        | 最小长度                                | number                                  | -        |
| max        | 最大长度                                | number                                  | -        |
| enum       | 枚举类型                                | string                                  | -        |
| pattern    | 正则表达式校验                          | RegExp                                  | -        |
| transform  | 校验前转换字段值                        | function(value) => transformedValue:any | -        |
| validator  | 自定义校验（注意，callback 必须被调用） | function(rule, value, callback)         | -        |


### 真实控件如何开发

一般来说，如果被 Form.Control 接管了，真实控件仅需处理：

 * id 一般用于同时给 id 和 name 赋值使用，如果没有真实表单控件，那么也应赋给要绑定 click 事件的元素，以便 label 点击时能够响应
 * value 当前值
 * onValueChange 统一的修改行为的相应句柄，只需在值发生修改时调用即可，参数为修改后的新值，这个实际上是 Control 传入的，通过 props 传入的 onValueChange 会由 Control 调用

当然也可以自行制定属性和响应句柄，只要不在以下范围，都会被透传至真实控件：
label, rules, defaultValue, status, message, className, style, onStatusChange, onRulesChange, onMessageChange

真实控件数据均是通过 props 获取，如果使用 state，需要注意内敛及与 props 的同步。
#### 样式管理

以 `Button` 为例，真实控件开发时其实仅需关注

 - ZhuiButton
 - ZhuiButtonSkin${Skinname}
 - ZhuiButton--is-${state}

这三个样式类，当然开发的时候要根据控件自己的 DOM 结构做精细化的控制，不过基本约束在这几个类中。

但有一种状况除外，当前布局控制并没有收敛至相应的样式中，所以现有样式的开发还会出现：`.ZhuiInline &` 这样的使用，或许以后会考虑清理。

开发建议：

 1. 在 Zhui${Control} 中定义基本通用样式
 2. 在 Zhui${Control}Skin${Skinname} 中定义不同皮肤下的区别展现
 3. 在 Zhui${Control}--is-${state} 中定义不同状态的区别展现，这个主要是通过 mixin 实现

### 控件的使用

公共 props

 - id 唯一性命名
 - defaultValue 默认值
 - value 当前取值
 - onValueChange 修改时的响应句柄

当然不同控件会有各自的自定义 props

我们有两种使用方式：

 1. 使用 Form 包围封装接管（推荐）
 2. 不使用 Form，此时需要通过 onValueChange 手动同步所有的数据变化

第一种，会进入封闭式的数据管理，此时仅需关注数据即可：

 - Form 级别： onSubmit 处理整体校验通过后的数据
 - 单个控件： onValueChange 响应单个控件数据修改

第二种则是开放式的：

 - 单个控件可以传入更多的 props，参看上面的 `核心属性`
 - 控件自身不存储数据，因此不会保存修改后的数值，因此必须响应 value 的修改在外面保存
 - 没有整个表单级的数据及校验处理

#### props.value

非常重要的属性！

在被 Form 包围接管的控件中，基本不需要考虑这个熟悉，仅适用 defaultValue 即可。

但在非 Form 包围接管的控件中，控件的值有两种方式处理：

 1. 不设置 value，交由控件的 state 自行控制，可以通过 onValueChange 通知外面响应处理，state.value 其实就是在这里做值同步使用的。
 2. 设置 value，这时会完全接管控件显示，需要通过 onValueChange 获取改变的值后，再通过 props.value 再传进去，否则值不会再改变！！


#### 控件的取值

defaultValue 用于设置默认值，在 value 没有值时使用此值
value 在 Form 接管时设置无效，不使用时则生效，但它的使用会导致控件值需要手动同步

由于 React 表单直接传入 undefined/null 会报警告，所以在默认值设定上我们约定：
 - value 空值为 ''；未指定时，值为 undefined，此时会使用 defaultValue
 - defaultValue 未指定时，值为 ''

因此实际上，只需决定是否给 defaultValue 赋值决定默认值，给 value 赋值决定实际值就好了。
上面说的那些实际上是针对于 Form 的 setValue resetValue clearValue 三个方法而言的


### 控件内嵌控件

当选择使用 `@connectControl` 时，控件就是一个 HOC 控件了，意味着布局、校验等功能的支持。

同时由于 HOC 不能传递 ref 的特点，就会使内嵌于一个 Controlled 控件的子控件并不会被 Form 发现，也不会受整体校验的控制，于是不必担心内嵌控件对于整体 Form 带来的影响。

而且，由于我们队 Control 传递的参数进行了限制，会导致内嵌控件不会受到整体的 rules 影响，自身不会触发校验。
