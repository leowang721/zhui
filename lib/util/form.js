/**
 * util for form
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

export function determineControlValue (props) {
  let value = props.value
  if (value == null) {
    value = props.defaultValue
  }
  if (value == null) {
    value = ''
  }
  return value
}

export function determineControlStatus (props) {
  if (props.disabled) {
    return 'disabled'
  }
  if (props.readonly) {
    return 'readonly'
  }
  return props.status || 'normal'
}
