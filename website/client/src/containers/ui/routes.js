/**
 * @file Example - Router
 *
 * @author Leo Wang(wangkemiao@zhihu.com)
 */

import React from 'react'
import {Route} from 'react-router'

import Index from './Index'
import Form from './Form'
import Button from './Button'
import Input from './Input'

const Routes = (
  <div>
    <Route exact path='/ui' component={Index} />
    <Route exact path='/ui/Form' component={Form} />
    <Route exact path='/ui/Button' component={Button} />
    <Route exact path='/ui/Input' component={Input} />
  </div>
)

export const index = Index

export default Routes
