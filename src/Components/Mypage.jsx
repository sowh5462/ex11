import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'

const Mypage = () => {
    const db = getFirestore(app);

    const storage = getStorage(app);

    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState('');

    const [file, setFile] = useState(null);

    const [form, setForm] = useState({
        email: sessionStorage.getItem('email'),
        name: '아무개',
        address: '인천',
        photo: ''
    });

    const {email, name, address, photo} = form;

    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    };

    const onSubmit = async(e) => {
        e.preventDefault()
        if(!window.confirm('수정하겠습니까')) return;

        setLoading(true);
        let url = '';
        if(file !== null){
            const fileName = `images/${Date.now()}_${file.name}`;
            const result = await uploadBytes(ref(storage, fileName), file);
            url = await getDownloadURL(result.ref);
        }
        await setDoc(doc(db, 'users', email), {...form, photo:url});
        setLoading(false);
    };

    const getInfo = async() => {
        setLoading(true);
        const result = await getDoc(doc(db, 'users', email));
        setForm(result.data())
        setImage(result.data().photo)
        setLoading(false);
    };

    useEffect(()=>{
        getInfo();
    },[]);

    if(loading) return <h1>Loading...</h1>
    return (
        <div>
            <Row className='justify-content-center my-5'>
                <Col md={6}>
                    <Card>
                        <Card.Title className='p-3 text-center'>
                            <h3>My page</h3>
                        </Card.Title>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                                <Form.Control placeholder='이름' className='my-3' name='name' value={name} onChange={onChange}/>
                                <Form.Control placeholder='주소' className='my-3' name='address' value={address} onChange={onChange}/>
                                <img src={image ? image : "http://via.placeholder.com/100x120"} width={100} height={120} />
                                <Form.Control type='file' placeholder='사진' className='my-3' onChange={onChangeFile} />
                                <Button type='submit'>정보수정</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Mypage