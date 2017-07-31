/**
 * util for dom
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

/**
 * A crude way of determining if an object is a window
 */
export function isWindow (obj) {
  // must use == for ie8
  /* eslint eqeqeq:0 */
  return obj !== null && obj !== undefined && obj == obj.window
}

export function getDocument (node) {
  if (isWindow(node)) {
    return node.document
  }
  if (node.nodeType === 9) {
    return node
  }
  return node.ownerDocument
}

export function getComputedStyle (el, props) {
  const d = getDocument(el)
  let computedStyle = d.defaultView.getComputedStyle(el, null)
  const result = {}

  // https://github.com/kissyteam/kissy/issues/61
  if (computedStyle) {
    for (let i = 0; i < props.length; i++) {
      let key = props[i]
      result[key] = computedStyle.getPropertyValue(key) || computedStyle[key]
    }
  }
  return result
}

function getClientPosition (elem) {
  if (!elem) {
    return
  }

  let box
  let x
  let y
  const doc = elem.ownerDocument
  const body = doc.body
  const docElem = doc && doc.documentElement
  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
  box = elem.getBoundingClientRect()

  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

  x = box.left
  y = box.top

  // In IE, most of the time, 2 extra pixels are added to the top and left
  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
  // IE6 standards mode, this border can be overridden by setting the
  // document element's border to zero -- thus, we cannot rely on the
  // offset always being 2 pixels.

  // In quirks mode, the offset can be determined by querying the body's
  // clientLeft/clientTop, but in standards mode, it is found by querying
  // the document element's clientLeft/clientTop.  Since we already called
  // getClientBoundingRect we have already forced a reflow, so it is not
  // too expensive just to query them all.

  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
  // 窗口边框标准是设 documentElement ,quirks 时设置 body
  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
  // 标准 ie 下 docElem.clientTop 就是 border-top
  // ie7 html 即窗口边框改变不了。永远为 2
  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

  x -= docElem.clientLeft || body.clientLeft || 0
  y -= docElem.clientTop || body.clientTop || 0

  return {
    left: x,
    top: y
  }
}

function getScroll (w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`]
  const method = `scroll${top ? 'Top' : 'Left'}`
  if (typeof ret !== 'number') {
    const d = w.document
    // ie6,7,8 standard mode
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method]
    }
  }
  return ret
}

function getScrollLeft (w) {
  return getScroll(w)
}

function getScrollTop (w) {
  return getScroll(w, true)
}

export function getOffset (el) {
  const pos = getClientPosition(el)
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  pos.left += getScrollLeft(w)
  pos.top += getScrollTop(w)
  return pos
}

function getNumber (value) {
  const result = parseFloat(value, 10)
  return isNaN(result) ? 0 : result
}

export function getRelativeOffset (self, element, relativePosition) {
  if (!self || !element) {
    return
  }

  const result = {}
  const elStyle = getComputedStyle(element, [
    'width', 'height', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'
  ])
  const elBorderWidth = {
    left: getNumber(elStyle.borderLeftWidth),
    right: getNumber(elStyle.borderRightWidth),
    top: getNumber(elStyle.borderTopWidth),
    bottom: getNumber(elStyle.borderBottomWidth)
  }

  const elOffset = getOffset(element)
  const elWidth = getNumber(elStyle.width) + elBorderWidth.left + elBorderWidth.right
  const elHeight = getNumber(elStyle.height) + elBorderWidth.top + elBorderWidth.bottom

  const h = relativePosition.charAt(0) || 'b'
  const v = relativePosition.charAt(1) || 'l'

  const selfRect = self.getBoundingClientRect()
  const selfStyle = getComputedStyle(self, 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth')
  const selfBorderWidth = {
    left: getNumber(selfStyle.borderLeftWidth),
    right: getNumber(selfStyle.borderRightWidth),
    top: getNumber(selfStyle.borderTopWidth),
    bottom: getNumber(selfStyle.borderBottomWidth)
  }

  // 水平相对位置
  switch (h) {
    case 't':
      result.top = elOffset.top
      break
    case 'm':
      result.top = elOffset.top + elHeight / 2 - getNumber(selfRect.height) / 2
      break
    default:
      result.top = elOffset.top + elHeight
      break
  }
  // 竖直相对位置
  switch (v) {
    case 'r':
      result.left = elOffset.left + elWidth
      break
    case 'c':
      result.left = elOffset.left + elWidth / 2 - getNumber(selfRect.width) / 2
      break
    default:
      result.left = elOffset.left + selfBorderWidth.top
      break
  }
  return result
}
