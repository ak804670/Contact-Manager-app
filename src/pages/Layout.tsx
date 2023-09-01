import React, { useState } from 'react';
import SideBar from '../components/SideBar';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}


const Layout = (props: Props) => {

  const { children} = props;

  const [isOpen, setIsOpen] = useState(false);



  const toggleCloseDrawer = () => {
    setIsOpen(false)
  }


  return (
    <div >

      <SideBar isOpen={isOpen} closeSideDrawer={toggleCloseDrawer} />

      <div className="p-4 top-0 sm:ml-40">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{ height: '95vh' }}>
          {children}
        </div>
      </div>

    </div>
  )
}

export default Layout
