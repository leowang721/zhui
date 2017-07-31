/**
 * @file SelectOption Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import PropTypes from 'prop-types'

export default class SelectOption extends React.Component {
  static ctrlName = 'SelectOption'

  static propTypes = {
    value: PropTypes.any,
    selected: PropTypes.bool
  }

  static isSelectOption = true
}
