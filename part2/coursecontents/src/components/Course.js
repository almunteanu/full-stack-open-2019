import React from 'react';

const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const renderedParts = parts.map(part => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  return <>{renderedParts}</>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p style={{ fontWeight: 'bold' }}>Total of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
