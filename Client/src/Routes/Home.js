import React, { useEffect } from 'react'
import { SideBar, Suggestions, Posts, Stories } from '../Components/Exports'
import useTitle from './../Hooks/useTitle';
import useBreakpoint from './../Hooks/useBreakpoint';
import { useDispatch, useSelector } from 'react-redux';
import { MessageAlert } from '../Components/Layouts/Alerts';
import { FeatureAction } from './../Redux/Slices/FeaturesSlice';
const Home = () => {
  const breakpoint = useBreakpoint();
  const { isNewMSG } = useSelector(state => state.Features)
  const { singleMSG } = useSelector(state => state.MSGs)
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleMSG) {
      dispatch(FeatureAction.setMessageAlert(true))
    }
  }, [singleMSG, dispatch])
  const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
  useTitle('Instegram');
  return (
    <div>
      {isNewMSG && <MessageAlert singleMSG={singleMSG} />}
      <SideBar />
      <div className='container px-0 max-w-5xl md:max-w-3xl xl:max-w-3xl xxl:max-w-5xl py-3 mt-12 lg:mt-0 lg:mr-10 xl:mr-60 xxxl:mr-[26rem]'>
        <div className='lg:grid lg:grid-cols-5 gap-3 duration-300 xl:mt-5'>
          <div className='gap-3 col-span-3'>
            <Stories />
            <Posts />
          </div>
          {!MobileView &&
            <div className='col-span-2'>
              <Suggestions />
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Home
