import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = total > 0 ? (good - bad)/total : 0
  const positive = total > 0 ? (good/total)*100 : 0
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine name="Good" value={good} />
          <StatisticsLine name="Neutral" value={neutral} />
          <StatisticsLine name="Bad" value={bad} />
          <StatisticsLine name="All" value={total} />
          <StatisticsLine name="Average" value={average.toFixed(2)} />
          <StatisticsLine name="Positive" value={positive.toFixed(2) + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ({good, setGood}) => {
    const updatedGood = good + 1
    console.log('good clicked', updatedGood)
    setGood(updatedGood)
  }
  
  const handleNeutralClick = ({neutral, setNeutral}) => {
    const updatedNeutral = neutral + 1
    console.log('neutral clicked', updatedNeutral)
    setNeutral(updatedNeutral)
  }
  
  const handleBadClick = ({bad, setBad}) => {
    const updatedBad = bad + 1
    console.log('bad clicked', updatedBad)
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => handleGoodClick({good, setGood})} text='Good' />
      <Button onClick={() => handleNeutralClick({neutral, setNeutral})} text='Neutral' />
      <Button onClick={() => handleBadClick({bad, setBad})} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App