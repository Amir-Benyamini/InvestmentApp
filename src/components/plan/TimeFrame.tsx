import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { changePlanTimeFrame } from "../../actions/Plan";
import { getYear, addYears } from "date-fns";

export const TimeFrame = inject("plansStore")(
  observer(() => {
    const [start, setStart] = React.useState<Date>(new Date());
    const [end, setEnd] = React.useState<Date>(addYears(new Date(), 1));
    const [planTimeFrame, setPlanTimeFrame] = React.useState<object>({
      start: getYear(start),
      end: getYear(end),
      timeFrame: getYear(end) - getYear(start),
    });

    useEffect(() => {
      updatePlanTimeRange(start!, end!);
    }, [start, end]);

    useEffect(() => {
      changePlanTimeFrame(planTimeFrame);
    }, [planTimeFrame]);

    const updatePlanTimeRange = (startDate: Date, endDate: Date) => {
      let startYear: number = getYear(startDate);
      let endYear: number = getYear(endDate);

      setPlanTimeFrame({
        start: startYear,
        end: endYear,
        timeFrame: endYear - startYear,
      });
    };

    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="center-content-container">
            <DatePicker
              views={["year"]}
              label="Start Year"
              minDate={new Date()}
              maxDate={new Date("2090-12-01")}
              value={start}
              onChange={(newValue) => {
                setStart(newValue!);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  size="small"
                  sx={{ width: 105, marginTop: 2 }}
                />
              )}
            />
            <Typography sx={{ margin: 2 }} variant="subtitle1">
              to
            </Typography>
            <DatePicker
              views={["year"]}
              label="End Year"
              minDate={addYears(new Date(), 1)}
              maxDate={new Date("2090-12-01")}
              value={end}
              onChange={(newValue) => {
                setEnd(newValue!);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  size="small"
                  sx={{ width: 105, marginTop: 2 }}
                />
              )}
            />
          </div>
        </LocalizationProvider>
      </div>
    );
  })
);
