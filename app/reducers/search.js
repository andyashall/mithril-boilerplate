const initialState = ''

const nav = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.data
    case 'CLEAR_SEARCH': 
      return ''
    default:
      return state
  }
}

export default nav