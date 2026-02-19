import { BrowserRouter, Route, Routes } from 'react-router-dom'

import DefaultLayout from './layouts/DefaultLayout'
import AddTask from './pages/addtask/AddTask.jsx'
import TaskList from './pages/tasklist/TaskList.jsx'
import GlobalProvider from './context/GlobalContext.jsx'

import './App.css'

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />} >
              <Route index element={<TaskList />} />
              <Route path='aggiungi-task' element={<AddTask />} />
              <Route path='lista-task' element={<TaskList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
