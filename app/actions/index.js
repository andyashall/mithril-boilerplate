export const search = (data) => {
  return {
    type: 'SEARCH',
    data: data
  }
}

export const clearSearch = () =>{
  return {
    type: 'CLEAR_SEARCH'
  }
}