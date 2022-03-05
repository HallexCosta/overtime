import BaseEntity, { BaseProps } from './base.entity'

type UserProps = BaseProps & {
  username: string
  password: string
}

export default class User extends BaseEntity<UserProps> {
  private constructor(props: UserProps) {
    super(props)
  }

  static create(props: UserProps) {
    return new User(props)
  }
}
