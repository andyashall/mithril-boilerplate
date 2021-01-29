import m from 'mithril'
import css from './style.scss'

const style = {
  author: {
    marginBottom: '10px',
    fontWeight: 'bold'
  }
}

export default class Post {
  view(vnode) {
    return m('.post',
      m('', {style: style.author}, vnode.attrs.author),
      m('', vnode.attrs.title)
    )
  }
}