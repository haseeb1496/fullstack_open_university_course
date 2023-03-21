import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ statistics }) => {
  if (statistics.all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={statistics.good} />
          <StatisticLine text="neutral" value={statistics.neutral} />
          <StatisticLine text="bad" value={statistics.bad} />
          <StatisticLine text="all" value={statistics.all} />
          <StatisticLine
            text="average"
            value={statistics.average / statistics.all}
          />
          <StatisticLine
            text="positive"
            value={((statistics.good / statistics.all) * 100).toString() + "%"}
          />
        </tbody>
      </table>
    );
  }
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const clickGood = () => {
    setGood(good + 1);
    setAverage(average + 1);
    setAll(all + 1);
  };

  const clickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const clickBad = () => {
    setBad(bad + 1);
    setAverage(average - 1);
    setAll(all + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics statistics={{ good, neutral, bad, all, average }} />
    </>
  );
};

export default App;
