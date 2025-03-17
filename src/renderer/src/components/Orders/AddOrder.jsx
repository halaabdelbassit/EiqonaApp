import { CheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function NewOrder() {
  const [clientID] = useState(uuidv4()) // Unique Client ID

  // Validation Schema
  const validationSchema = Yup.object({
    clientName: Yup.string().required('Client name is required'),
    orders: Yup.array().of(
      Yup.object({
        name: Yup.string().required('Order name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().min(0, 'Price cannot be negative').required('Price is required')
      })
    )
  })

  const initialValues = {
    clientName: '',
    orders: [{ name: '', description: '', price: '' }]
  }

  // Form Submit Handler
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Bill Submitted:', values)
    alert(`Bill for ${values.clientName} submitted successfully!`)
    resetForm()
    setSubmitting(false)
  }

  return (
    <div className=" m-2 p-4 rounded-lg shadow-md">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">فاتورة جديدة</h1>
      <p className="text-lg md:text-xl text-center my-3">
        <span className="font-bold">رقم الفاتورة: </span>
        <strong>{clientID}</strong>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => {
          // Calculate total price
          const totalPrice = values.orders.reduce(
            (sum, order) => sum + (parseFloat(order.price) || 0),
            0
          )

          return (
            <Form className="grid grid-cols-1 gap-4">
              {/* Client Name */}
              <div className="border-2 border-violet-900 p-3 rounded-lg">
                <label htmlFor="clientName" className="text-lg font-semibold mx-1">
                  اسم الزبون:
                </label>
                <Field
                  type="text"
                  id="clientName"
                  name="clientName"
                  className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                  placeholder="ادخل اسم الزبون"
                />
                <ErrorMessage
                  name="clientName"
                  component="div"
                  className="text-red-600 text-sm mx-2"
                />
              </div>

              {/* Orders FieldArray */}
              <FieldArray name="orders">
                {({ push, remove }) => (
                  <div>
                    {values.orders.map((order, index) => (
                      <div key={index} className="border-amber-500 border-2 p-3 rounded-lg mb-3">
                        <div className="relative p-3 rounded-lg mb-2">
                          {/* Remove Button */}
                          {values.orders.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="absolute top-4 left-4 border-2 boredr-red-200 p-1 text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}

                          <div className="grid grid-cols-2 items-center gap-2">
                            {/* Order Name */}
                            <div className="w-1/2">
                              <label className="text-lg font-semibold mx-1">نوع الخدمة</label>
                              <Field
                                type="text"
                                name={`orders.${index}.name`}
                                className="border-b-2 border-violet-300 focus:border-violet-500 focus:outline-none bg-transparent w-full"
                                placeholder="Enter order name"
                              />
                              <ErrorMessage
                                name={`orders.${index}.name`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>

                            {/* Description */}
                            <div className="w-1/3">
                              <label className="text-lg font-semibold mx-1">الوصف</label>
                              <Field
                                type="text"
                                name={`orders.${index}.description`}
                                className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                                placeholder="Enter order description"
                              />
                              <ErrorMessage
                                name={`orders.${index}.description`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>

                            {/* Price */}
                            <div className="w-1/2">
                              <label className="text-lg font-semibold mx-1">سعر الوحدة</label>
                              <Field
                                type="number"
                                name={`orders.${index}.price`}
                                className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                                placeholder="Enter price"
                              />
                              <ErrorMessage
                                name={`orders.${index}.price`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>

                            {/* Quantity */}
                            <div className="w-1/2">
                              <label className="text-lg font-semibold mx-1"> الكمية</label>
                              <Field
                                type="number"
                                name={`orders.${index}.quantity`}
                                className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
                                placeholder="Enter price"
                              />
                              <ErrorMessage
                                name={`orders.${index}.quantity`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Order Button */}
                    <div className="flex justify-center mt-2">
                      <button
                        type="button"
                        onClick={() => push({ name: '', description: '', price: '' })}
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <PlusIcon className="h-5 w-5" />
                        طلبية جديدة
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>

              {/* Total Price Display */}
              <div className="bg-gray-600 text-white p-3 rounded-lg text-xl font-semibold">
                السعر النهائي: DA {totalPrice.toFixed(2)}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 flex items-center gap-2"
                >
                  <CheckIcon className="h-5 w-5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Bill'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default NewOrder
