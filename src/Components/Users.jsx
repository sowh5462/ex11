import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, query, collection, onSnapshot } from 'firebase/firestore'

const Users = () => {
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const [users, setUsers] = useState(null);

    const getUsers = () => {
        setLoading(true);
        const q = query(collection(db, 'users'));
        onSnapshot(q, (result) => {
            let rows = [];
            result.forEach((doc) => {
                rows.push(doc.data());
            });
            setUsers(rows);
            setLoading(false);
        });
    };

    useEffect(() => {
        getUsers();
    }, [])

    if (users === null) return <h1>Loading...</h1>
    return (
        <div>
            <Row className='text-center my-5'>
                <h1>UserList</h1>
                {users.map(u =>
                    <Card key={u.email} className='m-1'>
                        <Card.Body>
                            <Row>
                                <Col xs={2}>
                                <img src={u.photo} width={100} height={120} />
                                </Col>
                                <Col xs={10} className='mx-auto my-auto'>
                                    <div>{u.name} [{u.email}]</div>
                                    <div>{u.address}</div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}
            </Row>
        </div>
    )
}

export default Users