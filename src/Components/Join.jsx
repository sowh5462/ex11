import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'


const Join = ({history}) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

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
        if(!window.confirm('가입하시겠습니까')) return;
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((success) => {
            //유저정보저장
            setDoc(doc(db, 'users', email), {
                email: email,
                name: '',
                address: '',
                photo: ''
            });
            alert('회원가입 성공');
            setLoading(false);
            history.push('/login');
        })
        .catch((error) => {
            alert('회원가입 실패' + error.message);
            setLoading(false)
        })
    };


    if(loading) return <h1>Loading...</h1>
    return (
        <div>
            <Row className='position-absolute top-50 start-50 translate-middle mt-3'>
                <Col>
                    <Card style={{ width: '30rem' }}>
                        <Card.Title className='p-3 text-center'>
                            <h3>Register</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form className='mb-3 text-center' onSubmit={onSubmit}>
                                <Form.Control placeholder='ID' className='mb-3' value={email} name='email' onChange={onChange} />
                                <Form.Control placeholder='PASSWORD' className='mb-3' type='password' value={password} name='password' onChange={onChange} />
                                <Button className='w-100' type='submit'>회원가입</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Join