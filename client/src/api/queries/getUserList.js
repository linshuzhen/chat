import fetch from '@/utils/fetch'

const getUserList = (obj) => {
  let query = `
  query {
    getUserList (
        token: "${obj.token}"
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
export default getUserList
