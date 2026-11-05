import { Field, InputType } from 'type-graphql'
import { Role } from '../../models/user.model'

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => Role, { nullable: true })
  role?: Role
}
