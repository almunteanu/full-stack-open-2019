import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} type="button">
      {text}
    </button>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === 'positive' ? '%' : ''}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getTotal();
  const getPositive = () => (good / getTotal()) * 100;

  if (getTotal() === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={getTotal()} />
          <Statistic text="average" value={getAverage()} />
          <Statistic text="positive" value={getPositive()} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToValue = (value, refFunc) => () => refFunc(value + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setToValue(good, setGood)} text="good" />
      <Button onClick={setToValue(neutral, setNeutral)} text="neutral" />
      <Button onClick={setToValue(bad, setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
