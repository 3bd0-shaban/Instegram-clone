import React from "react";
import { Home, SignIn,SignUp,Messages,Dashboard } from './Exports'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} ></Route>
        <Route path="/signin" element={<SignIn />} ></Route>
        <Route path="/signup" element={<SignUp />} ></Route>
        <Route path="/Messages" element={<Messages />} ></Route>
        <Route path="/dashboard" element={<Dashboard />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
