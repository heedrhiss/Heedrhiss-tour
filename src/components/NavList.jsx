import { Link } from "react-router-dom"
import Products from "../pages/Products"
import Pricing from "../pages/Pricing"

function NavList() {
    return (
        <nav>
            <ul>
                <li> <Link to={<Products />}>Products </Link> </li>
                <li> <Link to={<Pricing/>}>Pricing</Link></li>
            </ul>
        </nav>
    )
}

export default NavList
