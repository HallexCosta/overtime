import crypto from 'crypto'

export type BaseProps = {
  id?: string
  created_at?: Date
  updated_at?: Date
}

export default abstract class BaseEntity<EntityProps extends BaseProps> {
  protected constructor(public readonly props: EntityProps) {
    if (!this.props.id) this.props.id = crypto.randomUUID()
    if (!this.props.created_at) this.props.created_at = new Date()
    if (!this.props.updated_at) this.props.updated_at = new Date()
  }
}
