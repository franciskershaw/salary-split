import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
