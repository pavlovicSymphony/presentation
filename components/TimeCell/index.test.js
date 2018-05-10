import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import TimeCell from "./index";

describe("TimeCell", () => {
  it("should render time when the value is valid", () => {
    const props = {
      in_out: {start: '12:00:00', end: '15:00:00'},
      type: 'start',
      isLate: false,
      hasValue: true,
    };

    const RenderdTimeCell = shallow(<TimeCell { ...props } />);
    const spanEl = RenderdTimeCell.find('span');

    expect(spanEl.length).toBe(1);
    expect(spanEl.text()).toBe(moment(props.in_out.start, 'HH:mm:ss').format('HH:mmA'));
    expect(spanEl.hasClass('time') && spanEl.hasClass('success')).toBeTruthy();
    expect(toJSON(RenderdTimeCell)).toMatchSnapshot();
  });

  it("should render time when the value is valid but late check in", () => {
    const props = {
      in_out: {start: '12:00:00', end: '15:00:00'},
      type: 'start',
      isLate: true,
      hasValue: true,
    };

    const RenderdTimeCell = shallow(<TimeCell { ...props } />);
    const spanEl = RenderdTimeCell.find('span');

    expect(spanEl.length).toBe(1);
    expect(spanEl.text()).toBe(moment(props.in_out.start, 'HH:mm:ss').format('HH:mmA'));
    expect(spanEl.hasClass('time') && spanEl.hasClass('error')).toBeTruthy();
    expect(toJSON(RenderdTimeCell)).toMatchSnapshot();
  });

  it("should render X when end is undefined", () => {
    const props = {
      in_out: {start: '12:00:00', end: undefined},
      type: 'end',
      hasValue: true,
    };

    const RenderdTimeCell = shallow(<TimeCell { ...props } />);
    const spanEl = RenderdTimeCell.find('span');

    expect(spanEl.length).toBe(1);
    expect(spanEl.text()).toBe(' X ');
    expect(spanEl.hasClass('time') && spanEl.hasClass('error')).toBeTruthy();
    expect(toJSON(RenderdTimeCell)).toMatchSnapshot();
  });
});
