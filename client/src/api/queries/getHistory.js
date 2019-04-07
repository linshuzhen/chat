import fetch from '@/utils/fetch'

const getHistory = (obj) => {
  let query = `
  query {
    getHistory (
        token: "${obj.token}"
        target_id: ${obj.target_id}
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
export default getHistory
