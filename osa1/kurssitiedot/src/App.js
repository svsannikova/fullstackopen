import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
      <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.list[0]}/>
      <Part part={props.list[1]}/>
      <Part part={props.list[2]}/>
    </div>
  )
}

const Total = (props) => {
  let sum = props.list.map(o => o.exercises).reduce((a, c) => { return +a + +c });
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}]}

  return (
      <div>
        <Header course={course.name} />
        <Content list={course.parts} />
        <Total list={course.parts} />
      </div>
  )
}

export default App