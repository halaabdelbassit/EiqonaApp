import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import HelloImg from '../../assets/hello_img.png'

function HelloPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user session exists in cookies
    // const session = Cookies.get('session')

    const timer = setTimeout(() => {
      // if (session) {
      navigate('/home') // Redirect to home if logged in
      // } else {
      //   navigate('/login') // Redirect to login if not logged in
      // }
    }, 2000)

    return () => clearTimeout(timer) // Cleanup timeout on unmount
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.img
        className="max-w-full h-auto"
        src={HelloImg}
        alt="brand image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </div>
  )
}

export default HelloPage
