import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive =(good/total) * 100;
  
  if(good == 0 && neutral == 0 && bad == 0){
    return (
      <>
      <h2>Statistics</h2>
      <div>No Feedback Given</div>
      </>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text='Good: ' value={good} />
      <StatisticLine text='Neutral: ' value={neutral} />
      <StatisticLine text='Bad: ' value={bad} />
      <StatisticLine text='All: ' value={total} />
      <StatisticLine text='Avg: ' value={average} />
      <StatisticLine text='Positive: ' value={positive + ' %'} />
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text = ' bad'/>
      <div></div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    
    
    </>
  )
}

export default App