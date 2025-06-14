import React from "react";
import { Routes, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import PrivateRoute from "./components/UserAuth/PrivateRoute";
import { PlanDash } from "./components/plan/PlanDash";
import { MonitorDash } from "./components/monitor/MonitorDash";
import { Signup } from "./components/UserAuth/Signup";
import { Login } from "./components/UserAuth/Login";
import { Acivate } from "./components/UserAuth/Activate";
import { Profile } from "./components/UserAuth/Profile";
import { ForgotPassword } from "./components/UserAuth/ForgotPassword";
import { ResetPassword } from "./components/UserAuth/ResetPassword";
import { Home } from "./components/Home/Home";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "./constans/theme";
import { Nav } from "./components/nav";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = inject(
  "rates",
  "auth"
)(
  observer(() => {
    return (
      <ThemeProvider theme={customTheme}>
        <div>
          <Nav />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/activate/:token" element={<Acivate />} />
            <Route
              path="/auth/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route path="/auth/password/forgot" element={<ForgotPassword />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<PlanDash />} />
              <Route path="/monitor" element={<MonitorDash />} />
              <Route path="/plan" element={<PlanDash />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </div>
      </ThemeProvider>
    );
  })
);

export default App;
