import m from 'mithril'

import Header from '../../components/header'
import Posts from '../../components/posts'

export default class Home {
  view() {
    return [m(Header), m(Posts)]
  } 
}