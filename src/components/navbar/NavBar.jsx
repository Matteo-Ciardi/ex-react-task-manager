import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="aggiungi-task">Aggiungi Task</NavLink>
                </li>
                <li>
                    <NavLink to="lista-task">Lista Task</NavLink>
                </li>
            </ul>
        </nav>
    )
}