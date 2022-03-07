import assert from 'assert/strict'

import { instanceOf, mockDate, propertyHasValue } from '@tests/unit/util'

import ExtraWork from '@entities/extra-work.entity'

describe('@ExtraWorkEntity', () => {
  it('should create instance of user and assign props', () => {
    const extraWorkMocked = {
      date: mockDate(),
      start_at: '2021-03-02',
      end_at: '2021-03-02',
      over_time: 12,
      description: 'this is description'
    }

    const extraWork = ExtraWork.create(extraWorkMocked)
    
    assert.ok(instanceOf(extraWork, ExtraWork))

    const propsWithValues = ['date', 'start_at', 'end_at', 'over_time', 'description']

    for (const key of propsWithValues) {
      assert.ok(extraWorkMocked[key] === extraWork.props[key])
    }
  })
})
