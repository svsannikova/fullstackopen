import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Part = ({part}) => {
  return (
      <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}

const CourseList = ({courses}) => {
  return (
    <>
    {courses.map(course =>
      <Course key={course.id} course={course} />
    )}
    </>
  )
}

const Total = ({exercises}) => {
  let sum = exercises.map(o => o.exercises).reduce((a, c) => { return +a + +c });
  return (
    <h3>Total of {sum} exercises</h3>
  )
}

export default CourseList