import React from "react";
import { Home, SignIn, SignUp, ListMessaging, Dashboard, RequireAuth, Layout, Profile, PersistLogin, ProfileById, SetBirthday } from './Components/Exports'
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROLES } from './Config/Roles';
import { useGetUserQuery } from "./Redux/APIs/UserApi";
import { AnimatePresence } from 'framer-motion';

function App() {
  const { data: userInfo } = useGetUserQuery() || {};
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="birthday" element={<SetBirthday />} />
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
                <Route index element={<Home />} />
                <Route path=":username/message/:id" element={<ListMessaging />} />
                <Route path="messages" element={<ListMessaging />} />
                <Route path={userInfo?.username} element={<Profile />} />
                <Route path="/:username" element={<ProfileById />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
