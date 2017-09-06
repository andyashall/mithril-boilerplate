import m from 'mithril'
import css from './style.css'

export default class Header {
  post() {
    let data = {mes: 'hello', doot: 'bar'}
    m.request({
      method: 'POST',
      url: '/api/hello',
      data: data
    })
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  }
  view() {
    return m('.headCont',
      m('.headLeft', m("a[href=/]", {oncreate: m.route.link}, "Home")),
      m('.headRight', {onclick: this.post}, 'Login / Signup')
    )
  }
}