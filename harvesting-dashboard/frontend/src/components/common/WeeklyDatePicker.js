import React from 'react';
import moment from 'moment';
import {DatePicker} from "shards-react";
import {getWeekDays} from "../../backend/common";

 const WeeklyDatePicker = (props) => {
     const {date, setDate} = props
        return (
            <DatePicker
                size="sm"
                todayButton={"Hoy"}
                selected={date.toDate()}
                startDate={moment(date).startOf('isoWeek').toDate()}
                endDate={moment(date).endOf('isoWeek').toDate()}
                onChange={(value) => setDate(moment(value).startOf('isoWeek'))}
                locale={"es"}
                dateFormat={`wo yyyy '(${moment(date).startOf('isoWeek').format("DD MMM")} - ${moment(date).endOf('isoWeek').format("DD MMM")})'`}
                highlightDates={getWeekDays(date)}
                placeholderText="Fecha"
                dropdownMode="select"
                showWeekNumbers
                className="text-center"
            />

        );
    }
export default WeeklyDatePicker