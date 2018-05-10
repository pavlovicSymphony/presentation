/**
 * TimeCell component show the user the time so that it colors red
 * if nurse clocks in late, X if nurse did not clock in/out and
 * green nurse clock in/out if it in time
 * It uses isNurseLate method from utils folder
 */
import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';

import { TCell } from "../../../components/AdminTables";

import style from './TimeCell.scss';

const TimeCell = ({
  in_out,
  type,
  isLate = false,
  hasValue = true,
}) => {
  const time = in_out[type] ? in_out[type].split(" ").pop() : null;
  return (
    <TCell>
      {
        hasValue && time && !isLate && (
          <span className={`${style.time} ${style.success}`}>
            {moment(time, 'HH:mm:ss').format('hh:mmA')}
          </span>
        )
      }
      {
        hasValue && time && isLate && (
          <span className={`${style.time} ${style.error}`}>
            {moment(time, 'HH:mm:ss').format('hh:mmA')}
          </span>
        )
      }
      {
        hasValue && !time && (
          <span className={`${style.time} ${style.error}`}> X </span>
        )
      }
    </TCell>
  );
};

TimeCell.propTypes = {
  in_out: PropTypes.object,
  type: PropTypes.string,
  isLate: PropTypes.bool,
  hasValue: PropTypes.bool.isRequired,
};

export default TimeCell;