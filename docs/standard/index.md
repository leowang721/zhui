# 商业 UI 交互规范

所有的交互设计都是为了提升用户使用体验，我们期望通过交互规范的制定，不仅能够使得业务开发有规可循，能够提升研发效率，更重要的是为用户提供优异的操作体验。

## 1 基础约定

### 1.1 要求用语

在本文档中，使用的关键字会以英文表示，例如： `MUST`。

关键字被定义在 rfc2119 中。

 * MUST：表示绝对要求这样做。REQUIRED 或者 SHALL，与之同义。
 * MUST NOT：表示绝对不要求这样做。SHALL NOT 与之同义。
 * SHOULD：表示一般情况下应该这样做，但是在某些特定情况下可以忽视这个要求。RECOMMENDED 与之同义。
 * SHOULD NOT：表示一般情况下不应该这样做，但是在某些特定情况下可以忽视这个要求。NOT RECOMMENDED 与之同义。
 * MAY：表示这个要求完全是可选的，你可以这样做，也可以不这样做。OPTIONAL 与之同义。
## 2 表单类

表单类 UI 是前端 UI 库中最重要的组成部分，它影响到系统中所有跟用户交互有关的功能体验。

### 2.1 展现

基本原则：

 * 规范、对齐、整洁的呈现效果
 * 丰富而简明的信息提示
 * 数据预填写
 * 避免不必要的可操作感

#### 2.1.1. 表单字体 `SHOULD` 设置为 13px

    尽管从用户体验的角度来说，较大的字体能够提升用户体验
    但在商业系统中，我们经常需要尽量多的展现信息，过大的字体会导致页面效果或疏落、或拥挤。

#### 2.1.2. 新建类操作及复杂表单交互（如快速新建任务定制） `SHOULD` 使用全页跳转处理，而修改类操作 `SHOULD` 遵循就近修改原则使用弹出浮层处理

    表单整体独立展现有两种方式：弹出浮层 和 全页跳转，各有优缺点：

    弹出浮层：可以轻易的达到就近修改的交互目的，但缺点是不能直接通过地址访问，适用于修改类操作
    全页跳转：可以直接通过地址访问，但是修改操作会经历一次跳转，导致不能进行快速修改，适用于新建类操作

#### 2.2.3 表单在展现时，整体 `MUST` 有明显区域划分，内部分块 FieldSet 也 `MUST` 如此处理。

#### 2.2.4 表单整体 `MUST` 有标题，或在表单上侧，或作为浮出层标题

#### 2.2.5 表单元素原则上 `SHOULD` 在一行内呈现，所有信息的提示位置 `MUST` 就近恰当且明显，提示信息清晰易懂，且遵循下面描述：

    title：简要命名当前表单元素
    form：表单实体，其自身状态如上文所述
    description：描述表单填写时的注意事项，或者补充说明此项表单的作用
    info：常用于展示表单的验证信息，也可在此列出填写的具体要求，进而展现验证信息

#### 2.2.6 表单元素必填项 `MUST` 有明显标记，采用业内通用的红色 * 在行标题前展现

#### 2.2.7 表单元素 `SHOULD` 有填写建议信息，长文本输入 `MUST` 有 placeholder 信息展现填写建议

#### 2.2.8 表单元素 `SHOULD` 有补充信息的提示途径，所有的 专业术语、公式、较难理解的信息 都 `MUST` 有就近补充信息。

    这是因为商业产品大量存在专业术语、计算方式、特殊交互等有较难理解的信息，因此需要提供补充信息，并且能够快速查看。
    常见的做法为：就近提供信息 icon，在鼠标悬停时出现浮层信息， 例如： 预算ℹ。

#### 2.2.9 以下表单元素 `MUST` 有默认值： 下拉选择、单选框。如果无值可选，则 `SHOULD` 进行错误信息提示或容错处理，原则上日期选择也 `SHOULD` 有默认值，但时间极度敏感流程中可以不设默认值

#### 2.2.10 表单呈现的信息 `SHOULD` 尽量预填写已知字段，例如地址、电话等已预留存信息或从之前步骤带过来的数据

#### 2.2.11 元素鼠标悬停时鼠标形状 `MUST` 恰当，具体为：

##### 2.2.11.1 可点击元素 `MUST` 使用手型鼠标 icon
##### 2.2.11.2 文本信息 `MUST` 使用文本型鼠标 icon，即 I 型
##### 2.2.11.3 禁用状态 `MUST` 使用禁用鼠标 icon
##### 2.2.11.4 只读状态 `MUST` 使用默认的箭头鼠标 icon

#### 2.2.12 `SHOULD` 将因关联数据不全或无权限操作的 UI 的状态设置为禁用 或 只读，如果影响到整体表单的后续操作，`SHOULD` 禁用整体操作按钮

### 2.2 交互

基本原则：

 * 用户没有那么勤奋，提供必要的帮助
 * 良好的可访问性
 * 快速反馈，减少请求

#### 2.3.1 表单整体 `MUST` 具备良好的可访问性，支持键盘快速操作，具体为：

##### 2.3.1.1  `SHOULD` 可通过 tab 键快速切换表单元素，且遵循顺序
##### 2.3.1.2 在文本输入时， `SHOULD` 可通过 enter 键直接提交
##### 2.3.1.3 输入 Suggestion 等下拉列表  `MUST` 可通过方向键及 enter 实现切换和选择

#### 2.3.2  `MUST` 进行必要的前端输入校验，后端 `MUST` 进行输入校验

    两者的目的不同，前端校验是为了减少提交错误，缩短表单流程，并且实际上是可以被 hack 跳过的，而后端校验是必要的正确性验证

#### 2.3.3 合理选择表单校验的触发时机，整体 `SHOULD` 在设置焦点时清理错误信息，在输入时进行即时校验（前端校验）并呈现效果，在失焦时触发需要数据交互的校验行为，具体表单项校验细节如下：

    用户在输入时，有三种触发校验的途径：

     1. 设置焦点时
     2. 输入时
     3. 失去焦点时

##### 2.3.3.1 对于文本输入表单， `SHOULD` 进行即时输入校验，但必须进行 debounce 处理避免连续输入导致的过多处理

##### 2.3.3.2 对于 Radio、CheckBox、Toggle 等点选式表单，在 2.2.9 项默认值处理后，原则上不需进行即时校验，除非 CheckBox 为必选项或有个数要求，此时 `SHOULD` 进行即时校验

##### 2.3.3.3 对于 Select、DatePicker 等多次点选操作表单，要求等同于 2.3.3.2，但若选择操作较复杂，弹出界面有确定行为，则 `SHOULD` 在点击确定时进行校验

#### 2.3.4 即时校验 `SHOULD` 只处理当前表单项，对于其他项不予校验

#### 2.3.4 表单校验时的顺序 `SHOULD` 为：必填 > 长度 > 格式 > 复杂校验，一个表单项每次只展现一条错误信息

#### 2.3.5 单个表单校验时，只根据自身校验结果触发对整体提交按钮的禁用处理，即如果有错误，则禁用，否则启用，不考虑其他未填写的表单元素的校验

#### 2.3.6 表单提交时 `MUST` 再次校验，处理全部表单元素并展现全部错误信息，单个表单项依然只展现一条

#### 2.3.7 表单提交校验出错时 `SHOULD` 自动将焦点置于第一个错误 UI，节省用户时间

#### 2.3.8 按钮类表单元素的点击处理，`SHOULD` 进行防连点处理，即点击即触发自身禁用，待当前操作完成重新启用

#### 2.3.9 `SHOULD` 使用数据关联更新及自动补全，减少用户输入，例如身份证信息的填写可以导致自动更新生日信息或者小数位数的自动补全

#### 2.3.10 不要轻易清空用户填写的内容，如果真不可避免，`MUST` 明确的提示用户，如果可以，尽量采取数据更新的方式处理

#### 2.3.11 文本输入框 `SHOULD` 方便用户整体快速清空修改，因此在点击时 `SHOULD` 默认全选，但对于长文本输入类无需进行全选处理

#### 2.3.12 对于删除类无法恢复的操作 `MUST` 进行用户确认，即使用 Confirm 要求用户确认操作继续

#### 2.3.13 原则上应当避免过长的表单，对于业务导致的长表单，`SHOULD` 进行业务梳理使得流程清晰简明，如果不可避免，则 `SHOULD` 使每一步都相对独立，尽量能够做提交处理

#### 2.3.14 对于步骤较长的表单提交，`SHOULD` 有提交前总览确认环节让用户进行二次确认

#### 2.3.15 对于步骤较长的表单，`MAY` 支持草稿功能