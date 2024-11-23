import { Outlet } from "react-router-dom"
import Footer from "~/components/client/Footer/Footer"
import Header from "~/components/client/Header/Header"

function Client() {
  return (
    <div>
      	<Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Client