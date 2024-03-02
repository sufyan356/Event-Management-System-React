import { Outlet } from "react-router-dom"
import Header from "../../Admin/Pages/Header"
import AdminFooter from "../../Admin/Pages/Footer"

function AdminRoot() {
  return (
    <>
        <Header />
          <Outlet />
        <AdminFooter />
    </>
  )
}

export default AdminRoot