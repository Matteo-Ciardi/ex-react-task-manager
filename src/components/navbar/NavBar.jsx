import { NavLink } from 'react-router-dom'
import './navbar.css'

export default function NavBar() {
    return (
        <nav className='navbar'>
            <ul className='navlist'>
                <li>
                    <NavLink to="lista-task" className='navitem'>LISTA TASK</NavLink>
                </li>
                <li>
                    <NavLink to="aggiungi-task" className='navitem'>AGGIUNGI TASK</NavLink>
                </li>
            </ul>
        </nav>
    )
}