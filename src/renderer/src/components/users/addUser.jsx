import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewUser() {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the form from submitting the traditional way

    if (!username || !phone || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Check if the user already exists
      const checkResult = await window.api.checkUser({ username, phone })
      if (checkResult.exists) {
        setError('User already exists with the same username or phone number.')
        return
      }

      // Add the new user
      const result = await window.api.addUser({ username, phone, password })
      if (result.success) {
        alert('User added successfully!')
        navigate('/users') // Redirect to the users page
      }
    } catch (error) {
      console.error('Failed to add user:', error)
      setError('Failed to add user. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-amber-200 md:w-[90%] mx-auto mt-4 shadow-lg">
      <h1 className="text-center font-bold text-3xl">Add New User</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center font-medium tex-[1.9rem] mt-4">{error}</p>}
        <div className="grid lg:grid-cols-2 gap-2 mt-4">
          <div className="flex flex-col py-2 px-4">
            <label htmlFor="username" className="font-medium text-[1.4em]">
              اسم المستخدم
            </label>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95]"
            />
          </div>

          <div className="flex flex-col py-2 px-4">
            <label htmlFor="phone" className="font-medium text-[1.4em]">
              رقم المستخدم
            </label>
            <input
              type="tel"
              placeholder="رقم المستخدم"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95]"
            />
          </div>

          <div className="flex flex-col py-2 px-4">
            <label htmlFor="password" className="font-medium text-[1.4em]">
              كلمة المرور
            </label>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95]"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 w-[180px] text-yellow-50 disabled:bg-gray-400"
          >
            {loading ? 'جاري الإضافة...' : 'إضافة مستخدم جديد'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewUser
