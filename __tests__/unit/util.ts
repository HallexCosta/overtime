import assert from 'assert/strict'

export function instanceOf(obj: {}, refClass: Function) {
  if (obj instanceof refClass)  
    return true

  return false
}
export function mockDate() {
  return new Date('2002-07-16 03:34:02')
}

export function propertyExists<T extends {}>(object: T, propName: string) {
  const haveThisProp = object.hasOwnProperty(propName)

  if (haveThisProp)
    return false

  return true
}
export function propertyHasValue<T extends {}>(object: T, propName: string) {
  const noHasValue = object[propName] === undefined
   || object[propName] === null

  if (noHasValue)
    return false

  return true
}

export function isNotNullOrUndefined(value: any) {
  return value !== null && value !== undefined
}

// should test instanceOf check object is instance of class
{
  const Class = class {}
  assert.ok(instanceOf(new Class, Class))
}
// should test property from object has value
{
  assert.ok(propertyHasValue({ a: 1 }, 'a'))
}
