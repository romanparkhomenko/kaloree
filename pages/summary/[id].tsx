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
import { WorkoutProps } from '../../components/Workout';
import PropTypes from 'prop-types';
import { User } from 'next-auth';

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  let user = null;

  if (params?.id) {
    user = await prisma.user.findUnique({
      where: {
        id: Number(params?.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        caloriegoal: true,
        weightgoal: true,
      },
    });
  } else {
    user = await prisma.user.findUnique({
      where: {
        email: session ? session.user.email : 'rsparkhomenko@gmail.com',
      },
      select: {
        id: true,
        name: true,
        email: true,
        caloriegoal: true,
        weightgoal: true,
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

  const workouts = await prisma.workout.findMany({
    where: {
      user: { id: user ? user.id : -1 },
    },
    select: {
      workout: true,
      minutes: true,
      caloriesBurnt: true,
      weight: true,
      date: true,
    },
  });

  return {
    props: { meals, weights, user, workouts },
  };
};

type Props = {
  meals: MealProps[];
  weights: WeightProps[];
  user: User;
  workouts: WorkoutProps[];
};

const Summary: React.FC<Props> = props => {
  const { meals, weights, workouts, user } = props;

  const reverseArray = arr => {
    const newArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      newArray.push(arr[i]);
    }
    return newArray;
  };

  const reversedMeals = reverseArray(meals);
  const reversedWeights = reverseArray(weights);
  const reversedWorkouts = reverseArray(workouts);

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
      <SummaryHeader meals={meals} weights={weights} user={user} workouts={workouts} />
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
                    {reversedMeals &&
                      reversedMeals.map(meal => (
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
        {/* Workout Table */}
        <Row className="mt-3">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="col">
                  <h3 className="mb-0">My Workouts</h3>
                </div>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Workout</th>
                      <th scope="col">Minutes</th>
                      <th scope="col">Calories Burnt</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedWorkouts &&
                      reversedWorkouts.map(workout => (
                        <tr key={`workout-${workout.id}`}>
                          <td>{workout.workout}</td>
                          <td>{workout.minutes}min</td>
                          <td>{workout.caloriesBurnt}cal</td>
                          <td>{workout.weight}lbs</td>
                          <td>{workout.date}</td>
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
                    {reversedWeights &&
                      reversedWeights.map(weight => (
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
