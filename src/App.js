import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./pages/home/Home";
import Browse from "./pages/browse/Browse";
import Read from "./pages/browse/Read";
import Versions from "./pages/browse/Versions";
import History from "./pages/browse/History";
import Edit from "./pages/edit/Edit";
import Create from "./pages/edit/Create";
import Update from "./pages/edit/Update";
import Delete from "./pages/edit/Delete";
import Requests from "./pages/requests/Requests";
import Manage from "./pages/requests/Manage";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/dashboard/Admin";
import Pct from "./pages/dashboard/Pct";
import Extra from "./pages/extra/Extra";
import Faq from "./pages/extra/Faq";
import Qrg from "./pages/extra/Qrg";
import Discussions from "./pages/extra/Discussions";
import SamplePage from "./pages/SamplePage"



function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Box sx={{ minHeight: "100vh", display: "flex", flexDirection:"column" }}>
            <Topbar setIsSidebar={setIsSidebar} />
              <Box
                // position="absolute"
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  minHeight: "calc(100vh - 60px)",
                  maxHeight: "calc(100vh - 60px)",
                  overflowY: "hidden"
                }}
              >
                <Sidebar isSidebar={isSidebar} />
              <Box
                sx={{
                  display: "flex",
                  overflow: "hidden",
                  overflowY: "visible",
                  width: "100vw",
                }}
              >
                <main className="content" sx={{ flexGrow: 1, padding: 2 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/browse/read" element={<Read />} />
                    <Route path="/browse/versions" element={<Versions />} />
                    <Route path="/browse/history" element={<History />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/edit/create" element={<Create />} />
                    <Route path="/edit/update" element={<Update />} />
                    <Route path="/edit/delete" element={<Delete />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/requests/manage" element={<Manage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/pct" element={<Pct />} />
                    <Route path="/dashboard/admin" element={<Admin />} />
                    <Route path="/extra" element={<Extra />} />
                    <Route path="/extra/faq" element={<Faq />} />
                    <Route path="/extra/qrg" element={<Qrg />} />
                    <Route path="/extra/discussions" element={<Discussions />} />
                  </Routes>
                </main>
                </Box>
              </Box>
          </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
