import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { withRouter } from 'react-router-dom';



const Header = ({history}) => {
    let email = sessionStorage.getItem('email');

    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/')
    };

    return (
        <div>
            <img src="https://m.media-amazon.com/images/M/MV5BYmZjYTZjMDktZmJhNi00NGEwLWIyNzAtYjhmNTI1YzAwNjEyXkEyXkFqcGdeQXVyMjY5MTE2MzE@._V1_.jpg"
             style={{width:'100%', height:'150px'}} />
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">EX11</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#features">UserList</Nav.Link>
                        {email ? 
                            <Nav.Link href="#" onClick={onLogout}>Logout</Nav.Link>
                            :
                            <Nav.Link href="/login">Login</Nav.Link>
                        }
                         
                    </Nav>
                    {email && <span style={{color:'white'}}>{email}</span>}
                </Container>
            </Navbar>
            <br />

            
        </div>
    )
}

export default withRouter (Header)