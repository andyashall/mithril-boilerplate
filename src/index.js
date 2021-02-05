import m from 'mithril'

import Home from './views/home'
import Page from './views/page'
import Signin from './views/signin'


m.route(document.body, '/', {
  '/': Home,
  '/': Signin,
  '/p/:page': Page
})