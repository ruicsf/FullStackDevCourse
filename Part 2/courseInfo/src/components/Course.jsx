
const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
const Course = ({courses}) => {
    return (
      <>
      <div>
        {courses.map((course, i) => (
         <div key={i}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
         </div>
        ))}
      </div>
     
      </>
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
        <div key={i}>
        <Part part={part} />
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

  export default Course