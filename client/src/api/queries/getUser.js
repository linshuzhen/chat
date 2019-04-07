import fetch from '@/utils/fetch'

const getUser = (obj) => {
  let query = `
  query {
    getUser (
        tel: "${obj.tel}"
        password: "${obj.password}"
      ) {
        code
        message
        data
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
export default getUser
