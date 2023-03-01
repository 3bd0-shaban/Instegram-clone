import {
  Home, SignIn, SignUp, MessengerWindow, Dashboard, RequireAuth,
  Layout, Profile, Settings, PersistLogin, ProfileById, SetBirthday, NotficationMobile,
  ReelsSecion, SearchMobileView, PostComments, Confirm, ForgetPassword, ResetPassword, VerifyEmail
} from './Components/Exports'
import { Route, Routes, useLocation } from 'react-router-dom';
import { ROLES } from './Config/Roles';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './Redux/Slices/UserSlice';

function App() {
  const userInfo = useSelector(selectCurrentUser)
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={!location.pathname.includes('message') && location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<PersistLogin />}>
            {/* <Route element={<SocketConnect />}> */}
            <Route path="birthday" element={<SetBirthday />} />
            <Route path="confirm" element={<Confirm />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="verify" element={<VerifyEmail />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route index element={<Home />} />
              <Route path=":username/message/:id" element={<MessengerWindow />} />
              <Route path="reels" element={<ReelsSecion />} />
              <Route path="messages" element={<MessengerWindow />} />
              <Route path="search" element={<SearchMobileView />} />
              <Route path="notifies" element={<NotficationMobile />} />
              <Route path="p/:id" element={<PostComments />} />
              <Route path={userInfo?.username} element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/settings/:link' element={<Settings />} />
              <Route path="/:username" element={<ProfileById />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* </Route> */}
      </Routes>
    </AnimatePresence>
  );
}

export default App;
