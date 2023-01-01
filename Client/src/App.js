import React from "react";
import { Home, SignIn, SignUp, Messages, Dashboard, RequireAuth, Layout, PersistLogin } from './Components/Exports'
import { Route, Routes } from 'react-router-dom';
import { ROLES } from './Config/Roles';

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path='/' element={<Layout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]} />}></Route>
            <Route index element={<Home />} />
            <Route path="Messages" element={<Messages />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
