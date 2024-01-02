import { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  return (
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good+bad+neutral}/>
        <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
        <StatisticLine text="positive" value={good*100/(good+bad+neutral) + '%'}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Button = props => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      {good+bad+neutral ?
        <div>
          <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
      :
        <p>No feedback given</p>
      }
    </div>
  )
}

export default App