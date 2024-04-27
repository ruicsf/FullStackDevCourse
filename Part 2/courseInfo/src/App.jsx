import React from 'react'
import Course from './components/Course'


const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}


const Total = ({parts}) => {
    const total = parts.reduce((total, part) => total + part.exercises,0);
      
   
  return (
    <p>Number of exercises {total} </p>

  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, i) => (
        <div>
        <Part key={i} part={part} />
        </div>
      ))}
    </div>
  )
  
}

const Header = ({course}) => {
  return(
    <h1>{course}</h1>
  )
}

const App = ({ courses }) => {

  return (
    <div>
     <Course courses={courses}/>
    </div>
  );
};

export default App;