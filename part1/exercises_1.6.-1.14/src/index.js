
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return(
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positive}</p>
    </div>
  )
}

const Statistic = ({ text, value}) => {
  return(
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const NoFeedBack = () => 'No Feedback Given Yet'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => () => {
    setGood(newValue)
  }

  const setToNeutral = (newValue) => () => {
    setNeutral(newValue)
  }

  const setToBad = (newValue) => () => {
    setBad(newValue)
  }

  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good/all) * 100 + '%'

  return(
    <div>
      <h1>Give Feedback</h1>
      <Button
         handleClick={setToGood(good + 1)}
         text='good'
      />
      <Button
         handleClick={setToNeutral(neutral + 1)}
         text='neutral'
      />
      <Button
         handleClick={setToBad(bad + 1)}
         text='bad'
      />

      <table>
        <tbody>
          <tr>
            <td><Statistic text="good" /></td>
            <td><Statistic value={good} /></td>
          </tr>
          <tr>
            <td><Statistic text="neutral" /></td>
            <td><Statistic value={neutral} /></td>
          </tr>
          <tr>
            <td><Statistic text="bad" /></td>
            <td><Statistic value={bad} /></td>
          </tr>
          <tr>
            <td><Statistic text="all" /></td>
            <td><Statistic value={all==0? <NoFeedBack /> : all} /></td>
          </tr>
          <tr>
            <td><Statistic text="average" /></td>
            <td><Statistic value={all==0? <NoFeedBack /> : average} /></td>
          </tr>
          <tr>
            <td><Statistic text="positive" /></td>
            <td><Statistic value={all==0? <NoFeedBack /> : positive} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
