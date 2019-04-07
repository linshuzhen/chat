import fetch from '@/utils/fetch'

const addUser = (obj) => {
  let query = `
    mutation {
      addUser (
        name: "${obj.name}"
        password: "${obj.password}"
        tel: "${obj.tel}"
      ) {
        code
        message
      }
    }
  `
  return fetch({
    url: '/graphql',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data: { query }
  })
}
export default addUser
