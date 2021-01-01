import React, { useState } from "react";
import {signIn, useSession} from "next-auth/client";

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
} from "reactstrap";
// layout for this page
import Auth from "../layouts/Auth";
import {useRouter} from "next/router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const [session] = useSession();

  if (session) {
    router.push('/');
  }

  return (
      <Auth>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign in with your email, we'll send you a link.</small>
              </div>
              <Form role="form">
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button className="w-100" color="primary" type="button" onClick={() => signIn('email', {email: email})}>
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Auth>
  );
}

export default Login;
