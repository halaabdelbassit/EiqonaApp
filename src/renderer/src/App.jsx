import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import SideBar from './components/layout/SideBar'
import Header from './components/layout/Header'
import Home from './components/pages/Home'
import NewOrder from './components/Orders/AddOrder'
import NewUser from './components/users/addUser'
import UsersTable from './components/users/UsersList'
import Login from './components/pages/Login'
import HelloPage from './components/pages/HelloPage'
import OrdersList from './components/Orders/OrdersList'

/* ✅ Layout with Sidebar & Header */
function RootLayout() {
  return (
    <div className="flex h-screen">
      <SideBar /> {/* Sidebar remains on the left */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 flex-1 overflow-auto">
          <Outlet /> {/* Renders Home, Users, etc. */}
        </main>
      </div>
    </div>
  )
}

/* ✅ Separate Layout for Auth Pages */
function AuthLayout() {
  return <Outlet /> // No Sidebar/Header, only page content
}

/* ✅ Define Routes */
const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Auth Routes (No Sidebar/Header) */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<HelloPage />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main App Routes (With Sidebar & Header) */}
      <Route element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/newOrder" element={<NewOrder />} />
        <Route path="/orders" element={<OrdersList />} />
      </Route>
    </>
  )
)

/* ✅ Main App Component */
function App() {
  return <RouterProvider router={router} />
}

export default App
