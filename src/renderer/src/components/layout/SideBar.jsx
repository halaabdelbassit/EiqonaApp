import Logo from '../../assets/logo_main.svg'
import { HomeIcon, UsersIcon, CogIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

function SideBar() {
  const location = useLocation()

  // Retrieve session from cookies
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null
  const userType = session ? session.userType : null

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path

  return (
    <div
      className="relative right-0 z-40 flex flex-col justify-between
  shadow-2xl bg-[#F1F1F1C4] h-screen w-16 hover:w-50 transition-all duration-300 group"
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center py-4 px-2 h-30">
        <img src={Logo} alt="logo" className="w-4xs h-4xs" />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col felx-grow justify-center text-[1.2rem] pt-4">
        <ul className="pt-3 space-y-5 text-black">
          {/* Home */}
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${isActive('/home') ? 'bg-[#D8B8FF]' : ''}`}
          >
            <Link to="/home" className="flex items-center hover:text-[#201f1f] transition px-2">
              <HomeIcon className="h-6 text-violet-800 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                الرئيسية
              </span>
            </Link>
          </li>

          {/* Orders */}
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${isActive('/orders') ? 'bg-[#D8B8FF]' : ''}`}
          >
            <Link to="/orders" className="flex items-center hover:text-[#201f1f] transition px-2">
              <ClipboardDocumentIcon className="h-6 text-violet-800 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Orders
              </span>
            </Link>
          </li>

          {/* Users - Hidden for normal users */}
          {userType !== 0 && (
            <li
              className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${isActive('/users') ? 'bg-[#D8B8FF]' : ''}`}
            >
              <Link to="/users" className="flex items-center hover:text-[#201f1f] transition px-2">
                <UsersIcon className="h-6 text-violet-800 w-16 px-2" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Users
                </span>
              </Link>
            </li>
          )}

          {/* Settings */}
          <li
            className={`flex items-center gap-2 hover:bg-[#D8B8FF] py-1 transition ${isActive('/settings') ? 'bg-[#D8B8FF]' : ''}`}
          >
            <Link to="/#" className="flex items-center hover:text-[#201f1f] transition px-2">
              <CogIcon className="h-6 text-violet-800 w-16 px-2" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="mt-auto py-4">
        <button
          className="bg-[#D8B8FF] text-[#201f1f] px-4 py-2 rounded-lg font-semibold"
          onClick={() => {
            Cookies.remove('session')
            window.location.href = '/'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default SideBar
