import React, { useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import authStore from '../store/authStore';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/constats';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const registration = async () => {
    const response = authStore.registration(email, password);
    console.log(response);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 154 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Login' : 'Registration'} </h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row>
            {isLogin ? (
              <Button
                variant={'outline-success'}
                className="mt-5 align-self-end">
                Login
              </Button>
            ) : (
              <Button
                variant={'outline-primary'}
                className="mt-5 align-self-end"
                onClick={registration}>
                Registration
              </Button>
            )}

            {isLogin ? (
              <div>
                Don't have account?
                <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
              </div>
            ) : (
              <div>
                Do you have account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
