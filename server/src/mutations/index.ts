import * as graphql from 'graphql'
import addUser from './addUser'



var Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser
  }
})
export default Mutation
