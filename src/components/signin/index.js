import m from 'mithril'
import style from './style.scss'
import Cookie from 'js-cookie'

import store from '../../store'

export default class Signin {
  constructor() {
    this.state = {
      access: 'Edit',
      username: '',
      email: '',
      password: '',
      buttonText: 'Sign in',
      swapText: 'Sign up',
      signin: true
    }
  }
  signin(e) {
    e.preventDefault()
    m.request({
      method: 'POST',
      url: '/api/signin',
      data: this.state
    })
    .then((res)=>{
      Cookie.set('user', res, {expires: 7})
      let rootUrl = location.protocol + '//' + location.host
      window.location.assign(rootUrl)
    })
    .catch((err)=>{console.log(err)})
  }
  signup(e) {
    e.preventDefault()
    m.request({
      method: 'POST',
      url: '/api/signup',
      data: this.state
    })
    .then((res)=>{
      Cookie.set('user', res, {expires: 7})
      let rootUrl = location.protocol + '//' + location.host
      window.location.assign(rootUrl)
    })
    .catch((err)=>{console.log(err)})
  }
  swap() {
    if (this.state.signin) {
      this.state.signin = false
      this.state.buttonText = 'Sign up'
      this.state.swapText = 'Sign in'
    } else {
      this.state.signin = true
      this.state.buttonText = 'Sign in'
      this.state.swapText = 'Sign up'   
    }
  }
  resetPasswordButton() {
    this.linkSent = true
  }
  view() {
    return m('.signinCont',
      m('.signinLogo', 'AppName'),
      this.linkSent ? m('.signinCenter',
        m('b', 'A link has been sent to your email to reset your password')
      ) : 
      this.passwordReset ? m('.signinCenter',
        m('h3', 'Password Reset'),
        m('input', {type: 'email', placeholder: 'Email', onkeyup: (e) => this.state.email = e.target.value}),
        m('button', {onclick: () => this.resetPasswordButton()}, 'Send a link to reset password'),
        m('.passwordReset', {onclick: () => this.passwordReset = false}, 'Sign in')
      ) : m('.signinCenter',
        m('h3', this.state.buttonText),
        this.state.signin ? '' : m('select', {onchange: (e) => this.state.access = e.target.value},
          m('option', 'Edit'),
          m('option', 'Read'),
          m('option', 'Admin')
        ),
        this.state.signin ? '' : m('input', {type: 'text', placeholder: 'Username', onkeyup: (e) => this.state.username = e.target.value}),
        m('input', {type: 'email', placeholder: 'Email', onkeyup: (e) => this.state.email = e.target.value}),
        m('input', {type: 'password', placeholder: 'Password', onkeyup: (e) => this.state.password = e.target.value}),
        m('button', {onclick: (e) => this.state.signin ? this.signin(e) : this.signup(e)}, this.state.buttonText),
        m('.passwordReset', {onclick: () => this.swap()}, `or ${this.state.swapText}`),
        m('.passwordReset', {onclick: () => this.passwordReset = true}, 'Forgot password?')
      )
    )
  }
}