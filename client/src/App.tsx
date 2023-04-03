import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactElement } from 'react';
import SharedLayout from './components/SharedLayout/SharedLayout';
import AuthPage from './pages/AuthPage/AuthPage';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<AuthPage page="login" />} />
          <Route path="/register" element={<AuthPage page="register" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
