import { strictEqual, ok } from 'assert'

import User from '@entities/user.entity'

function instanceOf(obj: {}, refClass: Function) {
  if (obj instanceof refClass)  
    return true

  return false
}

describe('@UserEntity', () => {
  it('should create instance of user and assign props', () => {
    const user = User.create({
      username: 'hallexcosta',
      password: 'hallex123'
    })
    
    ok(instanceOf(user, User))
    strictEqual('hallexcosta', user.props.username)
    strictEqual('hallex123', user.props.password)
  })
})
