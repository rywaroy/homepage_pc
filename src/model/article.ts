export interface IList {
  title: string
  time: string
  intro: string
  watch: number
  tag: ITag
  id: number
  top: number
}

export interface IInfoState {
  title: string
  content: string
  name: string
  commentContent: string
  comment: IComment[]
}

interface ITag {
  color: string
  title: string
}

export interface IComment {
  name: string,
  time: string
  content: string
}