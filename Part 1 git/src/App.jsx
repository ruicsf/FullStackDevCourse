import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.label}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomNum = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randomNum());
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  
  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1; // selectd = the index and 1 gets added to the value at that index
    setVotes(newVotes); // updates votes with new array
  }

  const highestIndex = () => {
    let index = 0;
    let maxVotes = 0;
    for (let i = 0; i < votes.length; i++)     
       if (votes[i] > maxVotes) {
        maxVotes = votes[i];
        index = i;
       }
       return index
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes </div>
      <Button
        handleClick={() => setSelected(randomNum())}
        label="Next Anecdote"
      />

      <Button
        handleClick={handleVotes} 
        label='Vote'
      />

      <div>
        <h2>Anecdote with most votes</h2>
        <div>highest voted: {anecdotes[highestIndex()]}</div>
      </div>

    </>
  );
};
export default App;
