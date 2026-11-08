import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from 'type-graphql'

export enum Role {
  owner = 'owner',
  admin = 'admin',
  member = 'member',
  viewer = 'viewer',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role in the system',
})

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => Role, { nullable: true })
  role?: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
