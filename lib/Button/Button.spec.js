/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import Button from './index'

export default describe('Button component', () => {
  it('should render a html button', () => {
    const button = shallow(<Button value="123" id="test"/>)
    expect(button.contains(<button value="123" id="test" />))
  })
})
