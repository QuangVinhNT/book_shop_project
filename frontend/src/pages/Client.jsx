import { Outlet, useLocation } from "react-router-dom"
import Breadcrumbs from "~/components/client/Breadcrumbs/Breadcrumbs"
import Footer from "~/components/client/Footer/Footer"
import Header from "~/components/client/Header/Header"

function Client() {
  const location = useLocation().pathname
  return (
    <div>
      <Header />
      {location !== '/' && <Breadcrumbs />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Client