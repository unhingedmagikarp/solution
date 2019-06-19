import React, { Component } from "react";
import moment from "moment";

class Modal extends Component {
  state = {};

  getAvailability = date => {
    return date.availability ? "available" : "disabled";
  };

  getDays = index => {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    return weekdays[index];
  };

  getWeekdays = () => {
    return this.props.dates.slice(0, 7).map((item, index) => {
      return (
        <p key={index} className="dayBlock cooperhewitt">
          {this.getDays(item.date.day())}
        </p>
      );
    });
  };

  getMonths = () => {
    return this.props.dates[0].date.month() !==
      this.props.dates[this.props.dates.length - 1].date.month()
      ? `${moment()
          .month(this.props.dates[0].date.month())
          .format("MMMM")}/${moment()
          .month(this.props.dates[this.props.dates.length - 1].date.month())
          .format("MMMM")}`
      : `${moment(this.props.date.dates[0].month()).format("MMMM")}`;
  };

  render() {
    return (
      <div className="fill-window">
        <div className="modal-center">
          <p className="smallText cooperhewitt" style={{ textAlign: "center" }}>
            {this.getMonths()}
          </p>

          <div className="container2">
            <div className="days">{this.getWeekdays()}</div>
            <div className="days">
              {this.props.dates.map(item => {
                return (
                  <p
                    key={item.date.format("D")}
                    className={`block ${this.getAvailability(item)}`}
                    style={{ textAlign: "center", lineHeight: "40px" }}
                    onClick={e =>
                      item.availability && this.props.selectDate(e, item)
                    }
                  >
                    {item.date.format("D")}
                  </p>
                );
              })}
            </div>
            <button
              className="btn btn-center btn-confirm"
              onClick={this.props.hideModal}
            >
              GOT IT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
