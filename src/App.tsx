import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import Context from './context/Context';
import SharedLayout from './components/SharedLayout/SharedLayout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthPage from './pages/AuthPage/AuthPage';
import SplitPage from './pages/SplitPage/SplitPage';
import SummaryPage from './pages/SummaryPage/SummaryPage';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import Modal from './components/Modal/Modal';
import AccountForm from './pages/AccountsPage/AccountForm/AccountForm';
import { useIsFetching } from '@tanstack/react-query';

function App(): ReactElement {
  const { noAccounts, setNoAccounts } = useContext(Context);
  const isFetching = useIsFetching();

  return (
    <>
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
        <Modal
          isOpen={!isFetching && noAccounts}
          setIsOpen={setNoAccounts}
          canClose={false}>
          <AccountForm type="first" />
        </Modal>
      </BrowserRouter>
    </>
  );
}

export default App;
