// src/AgeCalculator.js
import React from 'react';
import './AgeCalculator.css';

function generateArray(start, end) {
  let arr = [];
  for (start; start <= end; start++) {
    arr.push(start);
  }
  return arr;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = generateArray(1, 31);
const years = generateArray(1900, new Date().getFullYear());

function calculateAge(birthday) {
  let today = new Date();
  let dob = new Date(birthday);
  let diff = today.getTime() - dob.getTime();
  let years = Math.floor(diff / 31556736000);
  let days_diff = Math.floor((diff % 31556736000) / 86400000);
  let months = Math.floor(days_diff / 30.4167);
  let days = Math.floor(days_diff % 30.4167);

  console.log(`${years} years ${months} months ${days} days`);
  return `${years} years ${months} months ${days} days`;
}

class AgeCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 25,
      month: 'Dec',
      year: 1998,
      age: '20 years 11 months 28 days',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleDayChange(e) {
    this.setState({
      day: e.target.value,
    });
  }

  handleMonthChange(e) {
    this.setState({
      month: e.target.value,
    });
  }

  handleYearChange(e) {
    this.setState({
      year: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const day = this.state.day,
      month = this.state.month,
      year = this.state.year;

    let age = calculateAge(`${month} ${day} ${year}`);

    this.setState({
      age: age,
    });
  }

  render() {
    return (
      <div className="age-calculator-container">
        <h1>Age Calculator</h1>
        <div className="above-age-input">Enter your date of birth</div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <Input arr={days} handleChange={this.handleDayChange} val={this.state.day} />
            <Input arr={months} handleChange={this.handleMonthChange} val={this.state.month} />
            <Input arr={years} handleChange={this.handleYearChange} val={this.state.year} />
          </div>
          <button type="submit" className="calculate-button">
            Calculate Age
          </button>
        </form>
        <article>
          <h2>Your age is</h2>
          <span>{this.state.age}</span>
        </article>
        <footer>
          Made By chiranjeevi Yeshwanth(21BCE1678) <a href="" target="_blank"></a>
        </footer>
      </div>
    );
  }
}

function Input(props) {
  let options = props.arr.map((item) => (
    <option value={item} key={item}>
      {item}
    </option>
  ));

  return <select onChange={props.handleChange} value={props.val}>{options}</select>;
}

export default AgeCalculator;
