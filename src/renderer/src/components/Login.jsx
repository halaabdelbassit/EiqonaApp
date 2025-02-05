import HelloImg from '../images/hello_img.png'
function Login() {
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
        <div className="flex flex-col w-full gap-3 ">
          <input
            type="text"
            placeholder="اسم المستخدم"
            className="w-full h-10 border border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95] text-right"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full h-10 border border-[#643C95] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#643C95] text-right"
          />

          {/* Forgot Password Link */}
          <a href="#" className="text-red-500 text-sm hover:underline self-start ">
            هل نسيت كلمة المرور؟
          </a>

          <button className="px-10 h-10 bg-[#643C95] text-white rounded-md hover:bg-[#532b7a] transition duration-300 mx-auto">
            تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  )
}
export default Login
