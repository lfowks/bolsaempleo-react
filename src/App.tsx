import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import ListCandidates from './pages/list-candidates/ListCandidates'
import { Outlet } from 'react-router-dom'
import Navbar from './_layout/components/Navbar'

function App() {

  const queryClient = new QueryClient()

  return (
    <div className='app-root'>
      <header className="navbar">
        <h1>Look for your dream Job!</h1>
        {/* <nav>
          <a>Home</a>
          <a>Add Candidate</a>
          <a>List of Candidates</a>
          <a>List of Offers</a>
        </nav> */}
        <Navbar/>
      </header>

      <div className="content">
        <div className="card-container">
        <QueryClientProvider client={queryClient}>
          <Outlet/>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </div>
      </div>

      <footer className="footer">
        <strong>UNA 2023 © - Bolsa de Empleo</strong>
      </footer>
    </div>
  )
}

export default App
