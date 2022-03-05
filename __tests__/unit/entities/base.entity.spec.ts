import assert from 'assert/strict'

import { instanceOf, propertyHasValue } from '@tests/unit/util'
import BaseEntity from '@entities/base.entity'

describe('@BaseEntity', () => {
  it('should create instance of user and assign props', () => {
    class SomeEntity extends BaseEntity<{}> {
      constructor() {
        super({})
      }

      static create() {
        return new SomeEntity()
      }
    }

    const someEntity = SomeEntity.create()
    
    assert.ok(instanceOf(someEntity, BaseEntity))
    assert.ok(propertyHasValue(someEntity.props, 'id'))
    assert.ok(propertyHasValue(someEntity.props, 'created_at'))
    assert.ok(propertyHasValue(someEntity.props, 'updated_at'))
  })
})

