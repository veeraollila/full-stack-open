import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, val}) =>{
  if(text === "Positive")
    return(<tr><td>{text}:</td><td>{val}%</td></tr>)
  return(<tr><td>{text}:</td><td>{val}</td></tr>)
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let avg = (good - bad) / all
  let positive = (good / all)*100

  if(all === 0)
    return(<p>No Data</p>)

  return(
    <table>
        <tbody>
          <StatisticLine text="Good" val={good} />
          <StatisticLine text="Neutral" val={neutral} />
          <StatisticLine text="Bad" val={bad} />
          <StatisticLine text="All" val={all} />
          <StatisticLine text="Average" val={avg.toFixed(1)} />
          <StatisticLine text="Positive" val={positive.toFixed(1)} />
        </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() =>{setGood(good+1)}} text="Good" />
      <Button handleClick={() =>{setNeutral(neutral+1)}} text="Neutral" />
      <Button handleClick={() =>{setBad(bad+1)}} text="Bad" />
      
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App