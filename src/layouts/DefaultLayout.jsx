import { Outlet } from 'react-router-dom'

import NavBar from '../components/navbar/NavBar'

import './defaultlayout.css'

export default function DefaultLayout() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main>
                <div className='container'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}