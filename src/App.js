import React, { Component } from "react";
import "./App.scss";
import Van from "./Assets/images/van.svg";
import Date from "./Assets/images/calendar.svg";
import Modal from "./Components/Modal";
import data from "./dates.json";
import moment from "moment";

class App extends Component {
  state = {
    show: false,
    dates: data.dates.map(item => {
      return { date: moment(item.date), availability: item.is_deliverable };
    }),
    selected: {
      date: moment(data.dates[0].date),
      availability: data.dates[0].is_deliverable
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    const modal = document.querySelector(".fill-window");
    modal.classList.add("close");
    setTimeout(() => this.setState({ show: false }), 600);
  };

  selectDate = (e, item) => {
    e.target.classList.toggle("selected");
    this.setState({ selected: item });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="side">
            <h1>Choose your delivery day</h1>
            <div className="delivery">
              <img src={Van} alt="Van icon" className="van" />
              <p className="smallText">Delivery is always free</p>
            </div>
            <div className="modalTrigger">
              <div className="calIcon">
                <span className="day">
                  {this.state.selected.date.format("D")}
                </span>
                <img src={Date} alt="Calendar" className="calendar" />
              </div>
              <div className="date">
                <p className="smallText">
                  {`${this.state.selected.date.format(
                    "D"
                  )} ${this.state.selected.date.format(
                    "dddd"
                  )} ${this.state.selected.date.format("MMM")}`}
                </p>
              </div>
              <div className="change">
                <p className="smallText" onClick={this.showModal}>
                  Change
                </p>
              </div>
            </div>
          </div>
          {this.state.show && (
            <Modal
              hideModal={this.hideModal}
              dates={this.state.dates}
              selectDate={this.selectDate}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
