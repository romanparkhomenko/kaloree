import React from 'react';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import { MealProps } from '../components/Meal';
import prisma from '../lib/prisma';
import { getSession, useSession } from 'next-auth/client';
import Admin from '../layouts/Admin';
import Header from '../components/Headers/Header';
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { meals: [] } };
  }

  const meals = await prisma.meal.findMany({
    where: {
      user: { email: session.user.email },
    },
    select: {
      food: true,
      foodCategory: true,
      grams: true,
      ounces: true,
      calories: true,
      date: true,
    },
  });
  return {
    props: { meals },
  };
};

type Props = {
  meals: MealProps[];
};

const Home: React.FC<Props> = props => {
  const { meals } = props;

  const [session] = useSession();
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
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="col">
                  <h3 className="mb-0">My Meals</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Food</th>
                      <th scope="col">Category</th>
                      <th scope="col">Grams</th>
                      <th scope="col">Ounces</th>
                      <th scope="col">Calories</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals &&
                      meals.map(meal => (
                        <tr key={`meal-${meal.id}`}>
                          <td>{meal.food}</td>
                          <td>{meal.foodCategory}</td>
                          <td>{meal.grams}g</td>
                          <td>{meal.ounces}oz</td>
                          <td>{meal.calories}cals</td>
                          <td>{meal.date}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

Home.propTypes = {
  meals: PropTypes.array,
};

export default Home;
