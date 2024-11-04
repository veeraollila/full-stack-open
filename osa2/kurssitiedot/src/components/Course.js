const Course = ({course}) => {

    const Header = ({ course }) => {
        return (
            <div>
                <h1>{course.name}</h1>
            </div>
          
        )
      }
      
      const Part = ({name, exercise}) => {
        return (
          <div>
            <p>{name} {exercise}</p>
          </div>
        )
      }
        
      const Content = ({courseList}) => {
        const partsList = courseList.parts
        return(
          <div>
            {partsList.map(
                (part, i) => 
                <Part key={partsList[i].name} name={partsList[i].name} exercise={partsList[i].exercises}/>
            )}
          </div>
        )
      }
  
    return(
      <div>
      <Header course={course} />
      <Content courseList={course} />
    </div>
    )
  }
  
  export default Course