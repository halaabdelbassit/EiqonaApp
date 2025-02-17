import { CheckIcon } from '@heroicons/react/20/solid'

function NewOrder() {
  return (
    <div className="bg-slate-500 m-2 p-4 rounded-lg shadow-md">
      <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">New Order</h1>

      {/* Form Layout */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        {/* Name Field */}
        <div className="bg-amber-400 p-3 rounded-lg">
          <label htmlFor="name" className="text-lg font-semibold mx-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="bg-green-400 p-3 rounded-lg">
          <label htmlFor="email" className="text-lg font-semibold mx-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Field */}
        <div className="bg-purple-400 p-3 rounded-lg">
          <label htmlFor="phone" className="text-lg font-semibold mx-1">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address Field */}
        <div className="bg-red-400 p-3 rounded-lg">
          <label htmlFor="address" className="text-lg font-semibold mx-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
            placeholder="Enter your address"
          />
        </div>

        {/* Order Type */}
        <div className="bg-indigo-400 p-3 rounded-lg">
          <label htmlFor="orderType" className="text-lg font-semibold mx-1">
            Order Type:
          </label>
          <select
            id="orderType"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        {/* Payment Method */}
        <div className="bg-teal-400 p-3 rounded-lg">
          <label htmlFor="payment" className="text-lg font-semibold mx-1">
            Payment Method:
          </label>
          <select
            id="payment"
            className="mx-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent w-full"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </select>
        </div>

        {/* Submit Button - Full Width on Small Screens */}
        <div className="flex justify-center pt-2 col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-12 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <CheckIcon className="h-5 w-5" />
            <span> Submit </span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewOrder
