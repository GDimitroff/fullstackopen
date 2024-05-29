import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <NavLink
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? 'bold' : '',
            color: isPending ? 'red' : 'black',
            viewTransitionName: isTransitioning ? 'slide' : '',
            paddingRight: 5,
          }
        }}
        to='/'
      >
        anecdotes
      </NavLink>
      <NavLink
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? 'bold' : '',
            color: isPending ? 'red' : 'black',
            viewTransitionName: isTransitioning ? 'slide' : '',
            paddingRight: 5,
          }
        }}
        to='/create'
      >
        create new
      </NavLink>
      <NavLink
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? 'bold' : '',
            color: isPending ? 'red' : 'black',
            viewTransitionName: isTransitioning ? 'slide' : '',
            paddingRight: 5,
          }
        }}
        to='/about'
      >
        about
      </NavLink>
    </nav>
  )
}

export default Navigation
