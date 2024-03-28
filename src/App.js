import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RequireAuth from "./scenes/requireAuth";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Dashboard1 from "./scenes/dashboard1";
import Pipeline from "./scenes/pipeline";
import Model from "./scenes/model";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [showTopbar, setShowTopbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/login") {
      setIsSidebar(false);
      setShowTopbar(false);
    } else {
      setIsSidebar(true);
      setShowTopbar(true);
    }
  }, [location]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isSidebar && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
            {showTopbar && <Topbar setIsSidebar={setIsSidebar} />}

            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/result"
                element={
                  <RequireAuth>
                    <Dashboard1 />
                  </RequireAuth>
                }
              />
              <Route
                path="/pipeline"
                element={
                  <RequireAuth>
                    <Pipeline />
                  </RequireAuth>
                }
              />
              <Route
                path="/model"
                element={
                  <RequireAuth>
                    <Model />
                  </RequireAuth>
                }
              />
              <Route
                path="/team"
                element={
                  <RequireAuth>
                    <Team />
                  </RequireAuth>
                }
              />
              <Route
                path="/contacts"
                element={
                  <RequireAuth>
                    <Contacts />
                  </RequireAuth>
                }
              />
              <Route
                path="/invoices"
                element={
                  <RequireAuth>
                    <Invoices />
                  </RequireAuth>
                }
              />
              <Route
                path="/form"
                element={
                  <RequireAuth>
                    <Form />
                  </RequireAuth>
                }
              />
              <Route
                path="/bar"
                element={
                  <RequireAuth>
                    <Bar />
                  </RequireAuth>
                }
              />
              <Route
                path="/pie"
                element={
                  <RequireAuth>
                    <Pie />
                  </RequireAuth>
                }
              />
              <Route
                path="/line"
                element={
                  <RequireAuth>
                    <Line />
                  </RequireAuth>
                }
              />
              <Route
                path="/faq"
                element={
                  <RequireAuth>
                    <FAQ />
                  </RequireAuth>
                }
              />
              <Route
                path="/calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />
              <Route
                path="/geography"
                element={
                  <RequireAuth>
                    <Geography />
                  </RequireAuth>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
