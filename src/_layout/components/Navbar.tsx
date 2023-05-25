import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <NavLink
                className='link parent-item capitalize nav-link'
                to="">Home</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="candidate">Candidate</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="list-candidates">List of Candidates</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="list-offers">List of Offers</NavLink >
        </nav>
    )
}

export default Navbar