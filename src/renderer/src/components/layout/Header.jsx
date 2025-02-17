import { ChevronDownIcon, UserIcon, CogIcon } from '@heroicons/react/24/outline'
import Profile_img from '../../assets/profile.jpg'

import { useState } from 'react'

function Header() {
  const [isToggleVisible, setIsToggleVisible] = useState(false)

  const handleToggle = () => {
    setIsToggleVisible(!isToggleVisible)
  }

  return (
    <div className="sticky top-0 z-40 flex bg-[#F1F1F1C4] h-30 w-full">
      {/* Other Content (Right Side) */}
      <div className="flex justify-between items-center px-4 py-2 flex-1">
        {/* Add other content here */}
      </div>

      {/* Profile Section (Left Side) */}
      <div className="flex justify-evenly space-x-2 items-center mr-0 px-2 w-[13rem] relative">
        {/* Chevron Icon (Clickable) */}
        <button onClick={handleToggle} className="focus:outline-none">
          <ChevronDownIcon className="h-5 w-5 text-blue-500" />
        </button>

        {/* Username and Profile Image */}
        <h1 className="">عبد الباسط</h1>
        <img src={Profile_img} alt="logo" className="w-15 h-15 rounded-full" />

        {/* Toggle Bar */}
        {isToggleVisible && (
          <div className="absolute top-full mt-2 ml-4 w-48 bg-white shadow-lg rounded-lg p-4">
            <ul>
              <li className="flex items-center py-2 space-x-2 hover:bg-gray-100 cursor-pointer">
                <CogIcon className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </li>
              <li className="flex items-center py-2 space-x-2 hover:bg-gray-100 cursor-pointer">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </li>
              <li className="flex items-center py-2 space-x-2 hover:bg-gray-100 cursor-pointer">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
