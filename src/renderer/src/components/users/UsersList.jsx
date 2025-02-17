import { useEffect, useState } from 'react'
import { BiEdit, BiSolidDetail, BiEraser, BiPlusCircle } from 'react-icons/bi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function UsersTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await window.api.getUsers()
        setUsers(users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setError('Failed to fetch users. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <p className="flex justify-center items-center">Loading users...</p>
  }

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: error
    })
  }

  const handleDelete = async (userId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    // If the user confirms, delete the user
    if (result.isConfirmed) {
      try {
        await window.api.deleteUser(userId) // Call the deleteUser function
        const newUsers = users.filter((user) => user.user_id !== userId)
        setUsers(newUsers)

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The user has been deleted.',
          showConfirmButton: false,
          timer: 1500 // Auto-close after 1.5 seconds
        })
      } catch (error) {
        console.error('Failed to delete user:', error)

        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user. Please try again.'
        })
      }
    }
  }

  const handleEdit = async (user) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit User',
      html: `
        <input type='text' id="swal-username" class="swal2-input" placeholder="Username" value="${user.username}">
        <input type="tel" id="swal-phone" class="swal2-input" placeholder="Phone" 
          value="${user.phone}" minlength="10" maxlength="10">
        <input id="swal-password" class="swal2-input" type="password" placeholder="Password" value="${user.password}">
        <select id="swal-active" class="swal2-input">
          <option value="true" ${user.active ? 'selected' : ''}>Active</option>
          <option value="false" ${!user.active ? 'selected' : ''}>Non-Active</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        return {
          username: document.getElementById('swal-username').value,
          phone: document.getElementById('swal-phone').value,
          password: document.getElementById('swal-password').value,
          active: document.getElementById('swal-active').value === 'true'
        }
      }
    })

    if (formValues) {
      try {
        await window.api.updateUser(user.user_id, formValues)

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.user_id === user.user_id ? { ...u, ...formValues } : u))
        )

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'User details have been updated.',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.error('Failed to update user:', error)
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Could not update the user. Please try again.'
        })
      }
    }
  }

  return (
    <div className="pt-4">
      <div className="w-full py-4 px-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-0">Users Management</h1>

        <button
          className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-2"
          href="/newUser"
          onClick={() => navigate('/newUser')}
        >
          Add User <BiPlusCircle />
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
            {users.map((user) => (
              <tr key={user.user_id} className="even:bg-amber-300 odd:bg-amber-200">
                <td className="px-4 py-2 text-center">{user.user_id}</td>
                <td className="px-4 py-2 text-center">{user.username}</td>
                <td className="px-4 py-2 text-center">{user.phone}</td>
                <td className="px-4 py-2 text-center">{user.password}</td>
                <td className="px-4 py-2 text-center">{user.active ? 'acive' : 'nonActive'}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEdit(user)}
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
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <BiEraser />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTable
