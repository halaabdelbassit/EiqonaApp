import Logo from '../../assets/logo_main.svg'
import { HomeIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom' // Import useLocation

function SideBar() {
  const location = useLocation() // Get the current route

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="sticky right-0 z-40 flex flex-col bg-[#F1F1F1C4] h-screen w-16 hover:w-60 transition-all duration-300 group">
      {/* Logo Section */}
      <div className="flex justify-center items-center py-4 px-2 h-30">
        <img src={Logo} alt="logo" className="w-4xs h-4xs" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col justify-center text-[1.2rem] pt-4">
        <ul className="pt-3 space-y-5 text-black">
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${
              isActive('/home') ? 'bg-[#D8B8FF]' : ''
            }`}
          >
            <Link to="/home" className="flex items-center hover:text-[#201f1f] transition px-2">
              <HomeIcon className="h-6 text-blue-500 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                الرئيسية
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${
              isActive('/orders') ? 'bg-[#D8B8FF]' : ''
            }`}
          >
            <Link to="/orders" className="flex items-center hover:text-[#201f1f] transition px-2">
              <HomeIcon className="h-6 text-blue-500 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Orders
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${
              isActive('/users') ? 'bg-[#D8B8FF]' : ''
            }`}
          >
            <Link to="/users" className="flex items-center hover:text-[#201f1f] transition px-2">
              <HomeIcon className="h-6 text-blue-500 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Users
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${
              isActive('/settings') ? 'bg-[#D8B8FF]' : ''
            }`}
          >
            <Link to="#" className="flex items-center hover:text-[#201f1f] transition px-2">
              <HomeIcon className="h-6 text-blue-500 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
