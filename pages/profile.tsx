import React, { useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
// layout for this page
import Admin from '../layouts/Admin';
import UserHeader from '../components/Headers/UserHeader';
import { getSession, useSession } from 'next-auth/client';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      image: true,
      caloriegoal: true,
      weightgoal: true,
    },
  });
  return {
    props: { user },
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Profile = props => {
  const { user } = props;

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [calorieGoal, setCalorieGoal] = useState(user.caloriegoal ? user.caloriegoal : '');
  const [weightGoal, setWeightGoal] = useState(user.weightgoal ? user.weightgoal : '');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [session] = useSession();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { email, name, calorieGoal, weightGoal };
      await fetch(`/api/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
          setSuccessMessage('Successfully updated profile');
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        })
        .catch(error => {
          setErrorMessage('Whoops, something went wrong');
          console.info(error);
        });
    } catch (error) {
      setErrorMessage('Whoops, something went wrong');
      console.error(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <Container>
          <Row className="flex-column align-items-center justify-content-center">
            <h1 className="text-black-50 text-center">Whoops!</h1>
            <p className="text-black-50 text-center">
              You need to be authenticated to view this page.
            </p>
            <a href="/login" className="btn btn-default">
              Login
            </a>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Admin>
      <UserHeader user={user} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href={`/summary/${user.id}`} onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          user.image
                            ? user.image
                            : require('assets/img/theme/profile-placeholder.png')
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="">
                <Row>
                  <Col lg="12" className="mt-9">
                    <h3 className="text-center">{user.name ? user.name : user.email}</h3>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-email">
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="roman@example.com"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-first-name">
                            Full name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="name"
                            placeholder="Full Name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="calorieGoal">
                            Daily Calorie Goal
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="calorieGoal"
                            placeholder="Calorie Goal"
                            type="number"
                            value={calorieGoal}
                            onChange={e => setCalorieGoal(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="weightGoal">
                            Weight Goal
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="weightGoal"
                            placeholder="Weight Goal"
                            type="number"
                            value={weightGoal}
                            onChange={e => setWeightGoal(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="align-items-center justify-content-end">
                      <Col lg="12" className="mt-3">
                        <button
                          className="btn btn-info bg-gradient-orange w-100"
                          onClick={e => submitData(e)}
                        >
                          Update Profile
                        </button>
                        {successMessage && (
                          <p className="text-center font-weight-700 text-info">{successMessage}</p>
                        )}
                        {errorMessage && (
                          <p className="text-center font-weight-700 text-warning">{errorMessage}</p>
                        )}
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default Profile;
