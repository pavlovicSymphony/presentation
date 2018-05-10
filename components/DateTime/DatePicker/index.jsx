/**
 * DatePicker component
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { SingleDatePicker } from 'react-dates';

class DatePicker extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.object,
    disabled: PropTypes.bool,
    onDateChange: PropTypes.func,
    showClearDate: PropTypes.bool,
    showDefaultInputIcon: PropTypes.bool,
    isOutsideRange: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    id: "singleDatePicker",
    date: null,
    disabled: false,
    placeholder: "",
    showClearDate: true,
    hidePreviousDates: true,
    showDefaultInputIcon: true,
    numberOfMonths: 1,
    isOutsideRange: undefined,
  };

  state = {
    focused: null,
  };

  render() {
    const {
      id,
      disabled,
      placeholder,
      defaultValue,
      onDateChange,
      showClearDate,
      showDefaultInputIcon,
      isOutsideRange,
    } = this.props;

    return (
      <SingleDatePicker
        id={ id }
        placeholder={ placeholder }
        date={ defaultValue }
        onDateChange={ onDateChange }
        focused={ this.state.focused }
        onFocusChange={ ({ focused }) => this.setState({ focused }) }
        showClearDate={ showClearDate }
        showDefaultInputIcon={ showDefaultInputIcon }
        disabled={ disabled }
        numberOfMonths={ 1 }
        isOutsideRange={isOutsideRange}
      />
    );
  }
}

export default DatePicker;
