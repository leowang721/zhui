/**
 * @file RadioOption Component
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import PropTypes from 'prop-types'

export default class RadioOption extends React.Component {
  static ctrlName = 'RadioOption'

  static propTypes = {
    value: PropTypes.any
  }

  static isRadioOption = true
}
