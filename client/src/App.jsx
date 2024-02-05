import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from "react-redux"
import Authorization from "./auth/Auth"
import Registration from "./reg/Reg"
import UserMain from './user/Main'
import NewReq from './user/NewReq'
import Account from './user/Account'
import RedAcc from './user/RedAcc'
import MainAdmin from './admin/MainAdmin'
import Header from './elements/header'
import "./index.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      {
        path: '/reg',
        element: <Registration />
      },
      {
        path: '/auth',
        element: <Authorization />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/reg" />
  },
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
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
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  },
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      {
        path: '/admin',
        element: <MainAdmin />
      },
      {
        path: '/myAccount',
        element: <Account />
      },
      {
        path: '/redactAccount',
        element: <RedAcc />
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/admin" />
  },
])

function App() {
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.roleid)
  const id = useSelector((state) => state.auth.id)

  console.log({ token, role, id })

  return (
    token ?
      role == 2 ?
        <RouterProvider router={authRouterAdmin} /> :
        <RouterProvider router={authRouter} /> :
      <RouterProvider router={router} />
  )
}

export default App
