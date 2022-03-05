import BaseEntity, { BaseProps } from './base.entity'

type ExtraWorkProps = BaseProps & {
  date: Date 
  start_at: string | Date
  end_at: string | Date
  over_time: number
  description: string
}

export default class ExtraWork extends BaseEntity<ExtraWorkProps> {
  private constructor(props: ExtraWorkProps) {
    super(props)
  }

  static create(props: ExtraWorkProps) {
    if (props.start_at instanceof String) props.start_at = new Date(props.start_at)
    if (props.end_at instanceof String) props.end_at = new Date(props.end_at)
    return new ExtraWork(props)
  }
}
