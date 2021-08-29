import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.num}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad, clicks}) => {
  let sum = good+bad+neutral
  if (clicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <>
    <div>
      <Header text="statistics"></Header>
    </div>
    <table>
    <tbody>
      <StatisticLine text="hyvä" num={good} />
      <StatisticLine text="neutral" num={neutral} />
      <StatisticLine text="bad" num={bad} />
      <StatisticLine text="all" num={sum} />
      <StatisticLine text="average" num={(good+(-1*bad))/(sum)} />
      <StatisticLine text="positive" num={good*100/sum}/>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [allClicks, setAll] =  useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <Header text="give feedback"></Header>
      <div>
        <Button handleClick={handleGoodClick} text='hyvä' />
        <Button handleClick={handleNeutralClick} text='neutraali ' />
        <Button handleClick={handleBadClick} text='huono' />       
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} clicks={allClicks} /> 
    </div>
  )
}

export default App