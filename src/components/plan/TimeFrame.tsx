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
    const [planTimeFrame, setPlanTimeFrame] = useState(1);
    const [start, setStart] = React.useState<Date | null>(new Date());
    const [end, setEnd] = React.useState<Date | null>(addYears(new Date(), 1));

    useEffect(() => {
      updatePlanTimeRange(start!, end!);
    }, [end, start]);

    useEffect(() => {
      console.log(planTimeFrame);
      changePlanTimeFrame(planTimeFrame);
    }, [planTimeFrame]);

    const updatePlanTimeRange = (
      startDate: number | Date,
      endDate: number | Date
    ) => {
      let start = getYear(startDate);
      let end = getYear(endDate);

      setPlanTimeFrame(end - start);
    };

    return (
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year"]}
            label="Start Year"
            minDate={new Date()}
            maxDate={new Date("2090-12-01")}
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
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
          <Typography id="date-range" variant="subtitle1">
            to
          </Typography>
          <DatePicker
            views={["year"]}
            label="End Year"
            minDate={addYears(new Date(), 1)}
            maxDate={new Date("2090-12-01")}
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                helperText={null}
                size="small"
                sx={{ width: 105 }}
              />
            )}
          />
        </LocalizationProvider>
      </div>
    );
  })
);
