import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';
import { getSession, useSession } from 'next-auth/client';
import SummaryHeader from '../../components/Headers/SummaryHeader';
import Admin from '../../layouts/Admin';
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
import { MealProps } from '../../components/Meal';
import { WeightProps } from '../../components/Weight';
import PropTypes from 'prop-types';
import { User } from 'next-auth';

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  let user = null;
  if (!session) {
    user = await prisma.user.findUnique({
      where: {
        id: Number(params?.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  const meals = await prisma.meal.findMany({
    where: {
      user: { id: user ? user.id : -1 },
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

  const weights = await prisma.weight.findMany({
    where: {
      user: { id: user ? user.id : -1 },
    },
    select: {
      pounds: true,
      date: true,
    },
  });
  return {
    props: { meals, weights, user },
  };
};

type Props = {
  meals: MealProps[];
  weights: WeightProps[];
  user: User;
};

const Summary: React.FC<Props> = props => {
  const { meals, weights, user } = props;

  if (!user) {
    return (
      <Layout>
        <Container>
          <Row className="flex-column align-items-center justify-content-center">
            <h1 className="text-black-50 text-center">Whoops!</h1>
            <p className="text-black-50 text-center">There is no user with this id.</p>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Admin>
      <SummaryHeader meals={meals} weights={weights} user={user} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Meals Table */}
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
        {/* Weight Table */}
        <Row className="mt-3">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="col">
                  <h3 className="mb-0">My Weight</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Pounds</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weights &&
                      weights.map(weight => (
                        <tr key={`weight-${weight.id}`}>
                          <td>{weight.pounds}lbs</td>
                          <td>{weight.date}</td>
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

Summary.propTypes = {
  meals: PropTypes.array,
  weights: PropTypes.array,
};

export default Summary;
