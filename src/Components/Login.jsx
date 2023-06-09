import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Login = ({history}) => {
    const auth = getAuth(app);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: 'user01@email.com',
        password: '12341234'
    });
    
    const {email, password} = form;

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(form);
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            alert('로그인 성공');
            sessionStorage.setItem('email', email);
            history.push('/');
            setLoading(false);
        })
        .catch((error)=>{
            alert('로그인 실패' + error.message);
            setLoading(false);
        })
    };

    if(loading) return <h1>Loading...</h1>
    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col md={6}>
                    <Card>
                        <Card.Title className='p-3 text-center'>
                            <h3>Login</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form className='mb-3 text-center' onSubmit={onSubmit}>
                                <Form.Control placeholder='ID' className='mb-3' value={email} name='email' onChange={onChange} />
                                <Form.Control placeholder='PASSWORD' className='mb-3' type='password' value={password} name='password' onChange={onChange} />
                                <Button className='w-100' type='submit'>로그인</Button>
                                <Link to="/join">회원가입</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Login