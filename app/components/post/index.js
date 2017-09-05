import m from 'mithril'
import css from './style.css'

export default class Post {
  view(vnode) {
    return m('.post',
      m('.postAuthor', vnode.attrs.author),
      m('.postTitle', vnode.attrs.title)
    )
  }
}