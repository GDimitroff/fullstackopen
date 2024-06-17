interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string
  kind: 'background'
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
