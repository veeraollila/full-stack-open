const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <div>
      <p>{part} {exercise}</p>
    </div>
  )
}
  
const Content = ({courseList}) => {
  return(
    <div>
      <Part part={courseList.parts[0].name} exercise={courseList.parts[0].exercises} />
      <Part part={courseList.parts[1].name} exercise={courseList.parts[1].exercises} />
      <Part part={courseList.parts[2].name} exercise={courseList.parts[2].exercises} />
    </div>
  )
}

const Total = ({courseList}) => {
  return(
    <p>Number of exercises {courseList.parts[0].exercises + courseList.parts[1].exercises + courseList.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }
  
  return (
    <div>
      <Header course={course} />
      <Content courseList={course} />
      <Total courseList={course} />
    </div>
  )
}

export default App