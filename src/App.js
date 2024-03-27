import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const location = useLocation(); // 使用 useLocation Hook 獲取當前路徑信息

  useEffect(() => {
    // 每當路徑變化時，檢查當前路徑是否為登錄頁面
    const path = location.pathname;
    if (path === "/login") {
      setIsSidebar(false); // 在登錄頁面不顯示側邊欄
      setShowTopbar(false); // 在登錄頁面不顯示頂部導航欄
    } else {
      setIsSidebar(true);
      setShowTopbar(true); // 其他頁面顯示頂部導航欄
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/result" element={<Dashboard1 />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/model" element={<Model />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
