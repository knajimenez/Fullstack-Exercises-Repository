const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ total }) => {
  const sum = total.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of exercises: {sum}</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={course} />
    </div>
  )
}

export default Course