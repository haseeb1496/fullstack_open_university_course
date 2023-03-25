const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <p>
    <b>total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((s, part) => s + part.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  );
};

export default Course;
