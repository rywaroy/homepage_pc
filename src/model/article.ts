export interface IList {
  title: string
  time: string
  intro: string
  watch: number
  tag: ITag
  id: number
  top: number
}

interface ITag {
  color: string
  title: string
}