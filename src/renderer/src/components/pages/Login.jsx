import { useState } from 'react'
import HelloImg from '../../assets/hello_img.png'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline' // Import icons

function Login() {
  const [showPassword, setShowPassword] = useState(false) // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Example usage in a React component
  const fetchUsers = async () => {
    try {
      const users = await window.api.getUsers() // Call the IPC endpoint
      console.log('Users:', users)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  // Call the function when needed
  fetchUsers()

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
            className="w-full h-10 border border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95]"
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              placeholder="كلمة المرور"
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
          <button className="px-10 h-10 bg-[#643C95] text-white rounded-md hover:bg-[#532b7a] transition duration-300 mx-auto">
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
