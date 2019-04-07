import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull} from 'sequelize-typescript'

@Table({tableName: 'user'})
export class User extends Model<User> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  @CreatedAt
  @AllowNull(false)
  @Column
  createdAt: Date

  @UpdatedAt
  @AllowNull(false)
  @Column
  updatedAt: Date
  
  @AllowNull(false)
  @Column
  tel: string
  
  @AllowNull(false)
  @Column
  password: string

  @AllowNull(false)
  @Column
  name: string

  @AllowNull(false)
  @Column
  avatar: string

  @Column(DataType.JSON)
  meta: any
  
}
