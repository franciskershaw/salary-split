import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactElement } from 'react';
import SharedLayout from './components/SharedLayout/SharedLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthPage from './pages/AuthPage/AuthPage';
import SplitPage from './pages/SplitPage/SplitPage';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import AccountsPage from './pages/AccountsPage/AccountsPage';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<AuthPage page="login" />} />
          <Route path="/register" element={<AuthPage page="register" />} />
          <Route path="/split" element={<PrivateRoute />}>
            <Route path="/split" element={<SplitPage />} />
          </Route>
          <Route path="/summary" element={<PrivateRoute />}>
            <Route path="/summary" element={<SummaryPage />} />
          </Route>
          <Route path="/accounts" element={<PrivateRoute />}>
            <Route path="/accounts" element={<AccountsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
