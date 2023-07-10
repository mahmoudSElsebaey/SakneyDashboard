import Dashboard from "../dashboard";
import Team from "./../team/index";
import Contacts from "./../contacts/index";
import Ads from "./../ads/index";
import Invoices from "./../invoices/index";
import Form from "./../form/index";
import Calendar from "./../calendar/index";
import FAQ from "./../faq/index";
import Bar from "./../bar/index";
import Line from "./../line/index";
import Geography from "./../geography/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../theme";
import Sidebar from "./../global/Sidebar";
import Topbar from "./../global/Topbar";
import { Route, Routes } from "react-router-dom";
import Pie from './../pie/index';
// import Login from "../login";
// import Register from "../register";
 


const MainDashboard = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/ads" element={<Ads />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default MainDashboard;
