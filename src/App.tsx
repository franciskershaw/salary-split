import "./App.css";

import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import useUser from "@/hooks/user/useUser";

import SharedLayout from "./components/layout/SharedLayout/SharedLayout";
import ThemeInitializer from "./contexts/Theme/ThemeInitializer";
import Accounts from "./pages/Accounts/Accounts";
import AccountTransactions from "./pages/AccountTransactions/AccountTransactions";
import Auth from "./pages/Auth/Auth";
import Bills from "./pages/Bills/Bills";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import NotFound from "./pages/NotFound/NotFound";
import Savings from "./pages/Savings/Savings";
import Settings from "./pages/Settings/Settings";

const PrivateRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Auth />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/accounts" element={<PrivateRoute />}>
            <Route index element={<Accounts />} />
            <Route path=":accountId" element={<AccountTransactions />} />
          </Route>
          <Route path="/bills" element={<PrivateRoute />}>
            <Route index element={<Bills />} />
          </Route>
          <Route path="/expenses" element={<PrivateRoute />}>
            <Route index element={<Expenses />} />
          </Route>
          <Route path="/savings" element={<PrivateRoute />}>
            <Route index element={<Savings />} />
          </Route>
          <Route path="/settings" element={<PrivateRoute />}>
            <Route index element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ThemeInitializer />
    </Router>
  );
}

export default App;
