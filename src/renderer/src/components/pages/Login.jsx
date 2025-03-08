import { useState } from 'react'
import HelloImg from '../../assets/hello_img.png'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline' // Import icons
import Cookies from 'js-cookie' // Import js-cookie for cookie management
import Swal from 'sweetalert2' // Import SweetAlert2 for notifications
import { useNavigate } from 'react-router-dom'

import Store from 'electron-store'

// const store = new Store();

function Login() {
  const [showPassword, setShowPassword] = useState(false) // State to manage password visibility
  const [username, setUsername] = useState('') // State for username input
  const [password, setPassword] = useState('') // State for password input
  const [loading, setLoading] = useState(false) // State for loading indicator
  const navigate = useNavigate()

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault() // Prevent form submission

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى إدخال اسم المستخدم وكلمة المرور'
      })
      return
    }

    setLoading(true) // Show loading indicator

    try {
      // Call the login IPC method to authenticate the user
      const result = await window.api.login({ username, password })

      if (result.success) {
        // Store session data in a cookie
        Cookies.set('session', JSON.stringify(result.session), { expires: 1 }) // Expires in 1 day

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح',
          showConfirmButton: false,
          timer: 1500 // Auto-close after 1.5 seconds
        })

        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate('/home') // Use navigate to redirect
        }, 1500)
      } else {
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: result.error || 'فشل تسجيل الدخول'
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء تسجيل الدخول'
      })
    } finally {
      setLoading(false) // Hide loading indicator
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="flex flex-col items-center w-[420px] h-[450px] py-2 px-4 gap-4 flex-shrink-0 
                    rounded-[20px] border-[5px] border-[#643C95] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center w-full">
          <img src={HelloImg} alt="brand-img" className="w-auto h-40" />
          <h1 className="text-xl font-bold text-[#643C95] mb-2">تسجيل الدخول</h1>
        </div>

        {/* Input Section */}
        <div className="flex flex-col w-full gap-3">
          {/* Username Input */}
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-10 border border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95]"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95] pl-10" // Add padding for icon
            />
            {/* Show/Hide Password Icon */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-[#643C95]" />
              ) : (
                <EyeIcon className="h-5 w-5 text-[#643C95]" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <a href="#" className="text-red-500 text-sm hover:underline self-end">
            هل نسيت كلمة المرور؟
          </a>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="px-10 h-10 bg-[#643C95] text-white rounded-md hover:bg-[#532b7a] transition duration-300 mx-auto"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
