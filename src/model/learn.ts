export interface IList {
  title: string
  time: string
  intro: string
  state: number
  md: string
  html: string
  sign: string
  tag: ITag
  id: number
  updatedAt: string
}

export interface ITag {
  title: string
  color: string
}