import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, withRouter } from 'react-router-dom';



const Header = ({ history }) => {
    let email = sessionStorage.getItem('email');

    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/')
    };

    return (
        <div>
            <img src="https://m.media-amazon.com/images/M/MV5BYmZjYTZjMDktZmJhNi00NGEwLWIyNzAtYjhmNTI1YzAwNjEyXkEyXkFqcGdeQXVyMjY5MTE2MzE@._V1_.jpg"
                style={{ width: '100%', height: '150px' }} />
            <Navbar bg="dark" variant="dark" className='header'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">UserList</NavLink>
                {email ? 
                <NavLink to="#">Logout</NavLink>
                :
                <NavLink to="/login">Login</NavLink>
                }
                {email && <span style={{ color: 'white' }}>{email}</span>}
            </Navbar>
            <br />


        </div>
    )
}

export default withRouter(Header)