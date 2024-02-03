import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Authorization from "./auth/Auth"
import Registration from "./reg/Reg"
import UserMain from './user/Main'
import NewReq from './user/NewReq'
import Account from './user/Account'
import RedAcc from './user/RedAcc'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/reg" />
  },
  {
    path: '/auth',
    element: <Authorization />
  },
  {
    path: '/reg',
    element: <Registration />
  },
  {
    path: '*',
    element: <Navigate to="/reg" />
  },
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <UserMain />
  },
  {
    path: '/myAccount',
    element: <Account />
  },
  {
    path: '/redactAccount',
    element: <RedAcc />
  },
  {
    path: '/newRequest',
    element: <NewReq />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  },
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/admin',
    element: <>admin</>
  },
  {
    path: '/myAccount',
    element: <RedAcc />
  },
  {
    path: '*',
    element: <Navigate to="/admin" />
  },
])

function App() {
  // dispetch(reset(12345678)) // попадут в action из регистрации
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.roleid)
  const id = useSelector((state) => state.auth.id)

  console.log({token, role, id})

  return (
    token ?
      role === 'ADMIN' ?
        <RouterProvider router={authRouterAdmin} /> :
        <RouterProvider router={authRouter} /> :
      <RouterProvider router={router} />
  )
}

export default App
