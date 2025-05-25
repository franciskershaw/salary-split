import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import PrivateRoute from "./components/layout/PrivateRoute/PrivateRoute";
import SharedLayout from "./components/layout/SharedLayout/SharedLayout";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Auth />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<div>Dashboard</div>} />
          </Route>
          <Route path="/accounts" element={<PrivateRoute />}>
            <Route index element={<div>Accounts</div>} />
          </Route>
          <Route path="/bills" element={<PrivateRoute />}>
            <Route index element={<div>Bills</div>} />
          </Route>
          <Route path="/expenses" element={<PrivateRoute />}>
            <Route index element={<div>Expenses</div>} />
          </Route>
          <Route path="/savings" element={<PrivateRoute />}>
            <Route index element={<div>Savings</div>} />
          </Route>
          <Route path="/settings" element={<PrivateRoute />}>
            <Route index element={<div>Settings</div>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
