import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = ({anecdotes, totalVotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)

  const setToSelected  = (newValue) => () => {
    setSelected(newValue)
  }

  const setToVote  = (newValue) => () => {
    var copy = {...totalVotes}
    copy[selected] +=1
    setVotes(newValue)
  }

  const mostVotes = Object.keys(totalVotes).reduce((a, b) => totalVotes[a] > totalVotes[b] ? a : b);
  const voteAnecdotesDisplay = totalVotes[mostVotes] == 0? 'No Votes Yet' : anecdotes[mostVotes]
  const votesNumDisplay = totalVotes[mostVotes] == 0? 'No Votes Yet' : totalVotes[mostVotes]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {totalVotes[selected]} votes</p>
      <Button
        handleClick = {setToVote(totalVotes[selected] += 1)}
        text ='vote'
      />
      <Button
        handleClick = {setToSelected(Math.floor(Math.random() * (anecdotes.length-1)))}
        text ='next anecdote'
      />
      <h2>Anecdote with the Most Votes</h2>
      <p>{voteAnecdotesDisplay}</p>
      <p>has {votesNumDisplay} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const totalVotes = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0}

ReactDOM.render(
  <App anecdotes={anecdotes} totalVotes={totalVotes} />,
  document.getElementById('root')
)   
