import * as graphql from 'graphql'
import getUserList from './getUserList'
import getHistory from './getHistory'
import getUser from './getUser'
var Query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getUserList,
    getHistory,
    getUser
  }
})
export default Query
