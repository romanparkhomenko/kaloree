import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, CardHeader, Container, Row, Col } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import { WeightProps } from '../Weight';
import { MealProps } from '../Meal';
import { WorkoutProps } from '../Workout';
import PropTypes from 'prop-types';
import { User } from 'next-auth';

type Props = {
  meals: MealProps[];
  weights: WeightProps[];
  user: User;
  workouts: WorkoutProps[];
};

const SummaryHeader: React.FC<Props> = ({ meals, weights, user, workouts }) => {
  const getMealData = allMeals => {
    const dates = allMeals.map(meal => {
      if (meal.date) {
        return meal.date;
      }
    });

    const calories = allMeals.map(meal => {
      if (meal.calories) {
        return meal.calories;
      }
    });

    const grams = allMeals.map(meal => {
      if (meal.grams) {
        return meal.grams;
      }
    });

    const ounces = allMeals.map(meal => {
      if (meal.ounces) {
        return meal.ounces;
      }
    });

    const calorieGoal = allMeals.map(meal => {
      if (meal.ounces && user.caloriegoal) {
        return user.caloriegoal;
      }
    });
    const mealData = {
      labels: dates,
      datasets: [
        {
          label: 'Calories',
          borderColor: '#28a745',
          data: calories,
        },
        {
          label: 'Grams',
          borderColor: '#0099cc',
          data: grams,
        },
        {
          label: 'Ounces',
          borderColor: '#ff6600',
          data: ounces,
        },
        {
          label: 'Calorie Goal',
          borderColor: '#e83e8c',
          data: calorieGoal,
        },
      ],
    };
    return mealData;
  };
  const getWeightData = allWeights => {
    const dates = allWeights.map(weight => {
      if (weight.date) {
        return weight.date;
      }
    });

    const pounds = allWeights.map(weight => {
      if (weight.pounds) {
        return weight.pounds;
      }
    });

    const weightGoal = allWeights.map(weight => {
      if (weight.pounds && user.weightgoal) {
        return user.weightgoal;
      }
    });
    const weightData = {
      labels: dates,
      datasets: [
        {
          label: 'Pounds',
          borderColor: '#fc0',
          data: pounds,
        },
        {
          label: 'Goal',
          borderColor: '#28a745',
          data: weightGoal,
        },
      ],
    };
    return weightData;
  };

  const getWorkoutData = allWorkouts => {
    const dates = allWorkouts.map(workout => {
      if (workout.date) {
        return workout.date;
      }
    });

    const weight = allWorkouts.map(workout => {
      if (workout.weight) {
        return workout.weight;
      }
    });

    const minutes = allWorkouts.map(workout => {
      if (workout.minutes) {
        return workout.minutes;
      }
    });

    const caloriesBurnt = allWorkouts.map(workout => {
      if (workout.caloriesBurnt) {
        return workout.caloriesBurnt;
      }
    });

    const workoutData = {
      labels: dates,
      datasets: [
        {
          label: 'Weight (lbs)',
          borderColor: '#007bff',
          data: weight,
        },
        {
          label: 'Minutes',
          borderColor: '#20c997',
          data: minutes,
        },
        {
          label: 'Calories Burnt',
          borderColor: '#6f42c1',
          data: caloriesBurnt,
        },
      ],
    };
    return workoutData;
  };

  const getWorkoutCategories = allWorkouts => {
    const categories = allWorkouts.map(workout => {
      if (workout.workout) {
        return workout.workout;
      }
    });

    const categoryOccurence = categories.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});

    console.info(categoryOccurence);

    const categoryData = {
      labels: Object.keys(categoryOccurence),
      datasets: [
        {
          // borderColor: '#fcc',
          data: Object.values(categoryOccurence),
          backgroundColor: [
            '#001f3f',
            '#39CCCC',
            '#01FF70',
            '#85144b',
            '#F012BE',
            '#3D9970',
            '#111111',
            '#AAAAAA',
            '#0074D9',
            '#FF4136',
            '#2ECC40',
            '#FF851B',
            '#7FDBFF',
            '#B10DC9',
            '#FFDC00',
          ],
        },
      ],
    };

    return categoryData;
  };

  const getCategoryData = allMeals => {
    const categories = allMeals.map(meal => {
      if (meal.foodCategory) {
        return meal.foodCategory;
      }
    });

    const categoryOccurence = categories.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});

    console.info(categoryOccurence);

    const categoryData = {
      labels: Object.keys(categoryOccurence),
      datasets: [
        {
          // borderColor: '#fcc',
          data: Object.values(categoryOccurence),
          backgroundColor: [
            '#0074D9',
            '#FF4136',
            '#2ECC40',
            '#FF851B',
            '#7FDBFF',
            '#B10DC9',
            '#FFDC00',
            '#001f3f',
            '#39CCCC',
            '#01FF70',
            '#85144b',
            '#F012BE',
            '#3D9970',
            '#111111',
            '#AAAAAA',
          ],
        },
      ],
    };

    return categoryData;
  };

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-title">
            <h1 className="text-center text-white mb-4">
              Summary for {user.name ? user.name : user.email}
            </h1>
          </div>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardHeader className="border-0">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Meals
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Line data={getMealData(meals)} />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardHeader className="border-0">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Weight
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Line data={getWeightData(weights)} />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardHeader className="border-0">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Pie data={getCategoryData(meals)} />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mt-4 mb-xl-0">
                  <CardHeader className="border-0">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Workout Types
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Pie data={getWorkoutCategories(workouts)} />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mt-4 mb-xl-0">
                  <CardHeader className="border-0">
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      Workouts
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Line data={getWorkoutData(workouts)} />
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

SummaryHeader.propTypes = {
  meals: PropTypes.array,
  weights: PropTypes.array,
};

export default SummaryHeader;
