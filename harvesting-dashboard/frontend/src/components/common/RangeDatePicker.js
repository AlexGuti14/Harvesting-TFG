import React from "react";
import classNames from "classnames";
import {
  InputGroup,
  DatePicker,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import "../../assets/range-date-picker.css";
import moment from "moment";
import {getWeekDays} from "../../backend/common";



const RangeDatePicker = ({startDate, handleStartDateChange, endDate, handleEndDateChange}) => {
    const classes = classNames("d-flex", "my-auto", "date-range");

    return (
        <InputGroup className={classes}>
            <DatePicker
                size="sm"
                selected={startDate}
                onChange={handleStartDateChange}
                placeholderText="Desde"
                dropdownMode="select"
                className="text-center"
                showWeekNumbers
                locale={"es"}
                dateFormat={`wo yyyy '(${moment(startDate).startOf('isoWeek').format("DD MMM")} - ${moment(startDate).endOf('isoWeek').format("DD MMM")})'`}
                showYearDropdown
                highlightDates={getWeekDays(startDate)}
            />
            <DatePicker
                size="sm"
                selected={endDate}
                onChange={handleEndDateChange}
                placeholderText="Hasta"
                dropdownMode="select"
                className="text-center"
                locale={"es"}
                showWeekNumbers
                dateFormat={`wo yyyy '(${moment(endDate).startOf('isoWeek').format("DD MMM")} - ${moment(endDate).endOf('isoWeek').format("DD MMM")})'`}
                showYearDropdown
                highlightDates={getWeekDays(endDate)}
            />
            <InputGroupAddon type="append">
                <InputGroupText>
                    <i className="material-icons">&#xE916;</i>
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    );
}

export default RangeDatePicker;
