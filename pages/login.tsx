import React, { useState } from 'react';
import { signIn, useSession, csrfToken } from 'next-auth/client';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
// layout for this page
import Auth from '../layouts/Auth';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const loginFailed = router && router.query && (router.query.failed === '1' || router.query.error);

  const [session] = useSession();

  if (session) {
    router.push('/');
  }

  return (
    <Auth>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-2">
              <small>Sign in with Google</small>
            </div>
            <div className="btn-wrapper text-center mb-4">
              <Button
                className="btn-neutral btn-icon w-100"
                color="default"
                type="button"
                onClick={() => signIn('google')}
              >
                <span className="btn-inner--icon">
                  <img alt="..." src={require('assets/img/icons/common/google.svg')} />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>

            <Form role="form">
              <div className="text-center text-muted mt-1 mb-2">
                <small>Sign up or Sign In</small>
              </div>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    id="email"
                    autoComplete="new-email"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input type="hidden" id="csrfToken" name="csrfToken" defaultValue={csrfToken} />
                </InputGroup>

                <InputGroup className="input-group-alternative my-1 mx-auto">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {loginFailed && (
                <p className="text-center text-warning font-weight-900">
                  Please check your email and password.
                </p>
              )}
              <div className="text-center flex-column align-items-center justify-content-center">
                <Button
                  className="w-100 my-1 mx-auto"
                  color="primary"
                  type="button"
                  onClick={() => signIn('login', { email: email, password: password })}
                >
                  Sign in
                </Button>
                <Button
                  className="w-100 my-1 mx-auto"
                  color="danger"
                  type="button"
                  onClick={() => signIn('register', { email: email, password: password })}
                >
                  Register
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Auth>
  );
};

export default Login;
