import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Candidate from './pages/candidate/Candidate.tsx'
import ListCandidates from './pages/list-candidates/ListCandidates.tsx'
import Home from './pages/home/Home.tsx'
import CandidateView from './pages/candidate-view/CandidateView.tsx'
import ListOffers from './pages/list-offers/ListOffers.tsx'
import CandidateOffers from './pages/candidate-offers/CandidateOffers.tsx'
import CandidateSkills from './pages/candidate-skills/CandidateSkills.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/candidate/:id" element={<CandidateView />} />
          <Route path="/list-candidates" element={<ListCandidates />} />
          <Route path="/list-offers" element={<ListOffers />} />
          <Route path="/candidate-offers/:id" element={<CandidateOffers />} />
          <Route path="/candidate-skills/:id" element={<CandidateSkills />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
