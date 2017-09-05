import m from 'mithril'
import Post from '../post'
import css from './style.css'

export default class Posts {
  constructor(vnode) {
    this.posts = []
  }
  oncreate(vnode) {
    console.log(vnode)
    let sub = vnode.dom.baseURI.replace('http://localhost:3000/', '')
    if (sub == '') {
      sub = 'JavaScript'
    }
    m.request({
      method: 'GET',
      url: `https://www.reddit.com/r/${sub}.json`
    })
    .then((res) => {
      let p = res.data.children
      this.posts = p
    })
    .catch((err)=>{console.log(err)})
  }
  view(vnode) {
    return m('.postsCont', this.posts.map(p => {
      return m(Post, {author: p.data.author, title: p.data.title})
    }))
  }
}