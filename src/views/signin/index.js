import m from 'mithril'

import store from '../../store'

import Signin from '../../components/signin'

export default class HomeV {
  oncreate() {
    document.title = 'Sign in'
  }
  view() {
    return m(Signin)
  }
}