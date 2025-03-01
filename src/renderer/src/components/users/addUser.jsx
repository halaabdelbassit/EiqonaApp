import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

function NewUser() {
  const navigate = useNavigate()

  // Validation Schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('اسم المستخدم مطلوب'),
    email: Yup.string().email('البريد الإلكتروني غير صالح'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'يجب أن يكون الرقم 10 أرقام')
      .required('رقم الهاتف مطلوب'),
    password: Yup.string()
      .min(6, 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل')
      .required('كلمة المرور مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
      .required('تأكيد كلمة المرور مطلوب'),
    account_type: Yup.string()
      .oneOf(['user', 'admin'], 'يجب اختيار نوع المستخدم')
      .required('نوع المستخدم مطلوب')
  })

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Check if the user exists
      const checkResult = await window.api.checkUser({
        username: values.username,
        email: values.email,
        phone: values.phone
      })

      if (checkResult.exists) {
        const errors = {}
        if (checkResult.duplicateFields.includes('username')) {
          errors.username = 'اسم المستخدم موجود بالفعل'
        }
        if (checkResult.duplicateFields.includes('email')) {
          errors.email = 'البريد الإلكتروني موجود بالفعل'
        }
        if (checkResult.duplicateFields.includes('phone')) {
          errors.phone = 'رقم الهاتف موجود بالفعل'
        }

        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'المستخدم موجود بالفعل',
          confirmButtonColor: '#d33'
        })
        setErrors(errors)
        return
      }

      // Add the new user
      const result = await window.api.addUser({
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        account_type: values.account_type,
        is_active: true
      })

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'تمت الإضافة بنجاح',
          text: 'تمت إضافة المستخدم بنجاح!',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          navigate('/users')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'فشل في إضافة المستخدم',
          confirmButtonColor: '#d33'
        })
      }
    } catch (error) {
      console.error('Failed to add user:', error)
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء إضافة المستخدم. يرجى المحاولة مرة أخرى.',
        confirmButtonColor: '#d33'
      })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="p-4 bg-amber-200 md:w-[90%] mx-auto mt-4 shadow-lg">
      <h1 className="text-center font-bold text-3xl">إضافة مستخدم جديد</h1>

      <Formik
        initialValues={{
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          account_type: '',
          is_active: true
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <div className="grid lg:grid-cols-2 gap-2">
              {/* Username */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="username" className="font-medium text-[1.4em]">
                  اسم المستخدم
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="أدخل اسم المستخدم"
                  className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3"
                />
                <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="email" className="font-medium text-[1.4em]">
                  البريد الإلكتروني
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="أدخل البريد الإلكتروني"
                  className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="phone" className="font-medium text-[1.4em]">
                  رقم الهاتف
                </label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="أدخل رقم الهاتف"
                  className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3"
                />
                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Account Type */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="account_type" className="font-medium text-[1.4em]">
                  نوع المستخدم
                </label>
                <Field
                  as="select"
                  name="account_type"
                  className="w-full h-10 border mt-2 p-2 border-[#643C95] rounded-md px-3 bg-white"
                >
                  <option value=""> اختر نوع الحساب </option>
                  <option value="user">مستخدم</option>
                  <option value="admin">مسؤول</option>
                </Field>
                <ErrorMessage
                  name="account_type"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="password" className="font-medium text-[1.4em]">
                  كلمة المرور
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col py-2 px-4">
                <label htmlFor="confirmPassword" className="font-medium text-[1.4em]">
                  تأكيد كلمة المرور
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="أكد كلمة المرور"
                  className="w-full h-10 border mt-2 border-[#643C95] rounded-md px-3"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 w-[180px] text-yellow-50 disabled:bg-gray-400"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span>جاري الإضافة...</span>
                    <span className="ml-2 animate-spin">&#9696;</span>
                  </div>
                ) : (
                  'إضافة مستخدم جديد'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="bg-red-500 hover:bg-red-600 rounded-lg py-2 px-4 w-[180px] text-yellow-50 ml-4"
              >
                إلغاء
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default NewUser
