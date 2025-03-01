import {
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/outline'
import Profile_img from '../../assets/profile.jpg'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2' // Import SweetAlert2

function Header() {
  const [isToggleVisible, setIsToggleVisible] = useState(false)
  const navigate = useNavigate()

  // Toggle the dropdown menu
  const handleToggle = () => {
    setIsToggleVisible(!isToggleVisible)
  }

  // Handle logout with SweetAlert2 confirmation
  const handleLogout = async () => {
    // Show confirmation dialog with custom icons, animations, and styles
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'هل تريد تسجيل الخروج؟',
      icon: 'warning', // Custom icon
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، سجل الخروج',
      cancelButtonText: 'إلغاء',
      customClass: {
        popup: 'animate__animated animate__fadeIn', // Add animation
        confirmButton: 'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600', // Custom button style
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600' // Custom button style
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn' // Animation when showing
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut' // Animation when hiding
      }
    })

    // If the user confirms, proceed with logout
    if (result.isConfirmed) {
      try {
        // Call the logout API
        await window.api.logout()

        // Clear the session cookie
        Cookies.remove('session')

        // Show success message with custom icon and animation
        Swal.fire({
          title: 'تم تسجيل الخروج بنجاح',
          icon: 'success', // Custom icon
          showConfirmButton: false,
          timer: 1500, // Auto-close after 1.5 seconds
          customClass: {
            popup: 'animate__animated animate__fadeIn' // Add animation
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn' // Animation when showing
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut' // Animation when hiding
          }
        })

        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } catch (error) {
        console.error('Logout error:', error)

        // Show error message with custom icon and animation
        Swal.fire({
          title: 'خطأ',
          text: 'حدث خطأ أثناء تسجيل الخروج',
          icon: 'error', // Custom icon
          customClass: {
            popup: 'animate__animated animate__fadeIn' // Add animation
          },
          showClass: {
            popup: 'animate__animated animate__fadeIn' // Animation when showing
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut' // Animation when hiding
          }
        })
      }
    }
  }

  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null

  return (
    <div className="relative top-0 z-40 flex bg-[#F1F1F1C4] h-30 w-full">
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
        <h1 className="font-semibold uppercase"> {session ? session.username : null}</h1>
        <img src={Profile_img} alt="logo" className="w-15 h-15 rounded-full" />

        {/* Toggle Bar */}
        {isToggleVisible && (
          <div className="absolute top-full mt-2 ml-4 w-48 bg-white shadow-lg rounded-lg p-4">
            <ul>
              <li className="flex items-center py-2 space-x-2 hover:bg-amber-100 cursor-pointer">
                <CogIcon className="h-5 w-5 mr-2" />
                <span>Settings</span>
              </li>
              <li className="flex items-center py-2 space-x-2 hover:bg-amber-100 cursor-pointer">
                <UserIcon className="h-5 w-5 mr-2" />
                <span>حسابي</span>
              </li>
              <li
                className="flex items-center py-2 space-x-2 hover:bg-amber-100 cursor-pointer"
                onClick={handleLogout}
              >
                <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2 text-red-400" />
                <span>تسجيل الخروج</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
