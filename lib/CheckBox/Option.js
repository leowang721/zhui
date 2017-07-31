/**
 * @file CheckBoxOption Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import PropTypes from 'prop-types'

export default class CheckBoxOption extends React.Component {
  static ctrlName = 'CheckBoxOption'

  static propTypes = {
    value: PropTypes.any
  }

  static isCheckBoxOption = true
}
