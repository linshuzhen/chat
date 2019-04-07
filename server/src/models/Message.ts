import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, AutoIncrement, PrimaryKey, AllowNull} from 'sequelize-typescript'

@Table({tableName: 'message'})
export class Message extends Model<Message> {

  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: number

  @CreatedAt
  @Column
  createdAt: Date

  @UpdatedAt
  @Column
  updatedAt: Date
  
  @AllowNull(false)
  @Column
  msg_to: number
  
  @AllowNull(false)
  @Column
  msg_from: number

  @AllowNull(false)
  @Column
  msg_content: string

  @AllowNull(false)
  @Column
  msg_type: number

  @AllowNull(false)
  @Column
  msg_time: Date

  @Column(DataType.JSON)
  meta: any
  
}
