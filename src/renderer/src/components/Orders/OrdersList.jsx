import { useNavigate } from 'react-router-dom'
import { BiEdit, BiEraser, BiPlusCircle, BiSolidDetail } from 'react-icons/bi'

function OrdersList() {
  const navigate = useNavigate()
  return (
    <div className="pt-4">
      <div className="w-full py-4 px-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-0">order Management</h1>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2"
          onClick={() => navigate('/newOrder')}
        >
          new order <BiPlusCircle />
        </button>
      </div>
      <div className="overflow-x-auto sticky">
        <table className="table-auto p-2 w-full mt-4">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">isActive</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-amber-300 odd:bg-amber-200">
              <td className="px-4 py-2 text-center">hhhhh</td>
              <td className="px-4 py-2 text-center">hhhhh</td>
              <td className="px-4 py-2 text-center">hhhhh</td>
              <td className="px-4 py-2 text-center">hhhhh</td>
              <td className="px-4 py-2 text-center">hhhhhh </td>
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    //   onClick={() => handleEdit(user)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    // onClick={() => handleDetails(user.user_id)}
                  >
                    <BiSolidDetail />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    //   onClick={() => handleDelete(user.user_id)}
                  >
                    <BiEraser />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersList
