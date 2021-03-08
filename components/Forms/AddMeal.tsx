import React, { useState } from 'react';

import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';

const AddMeal: React.FC = () => {
  const [food, setFood] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [grams, setGrams] = useState('');
  const [ounces, setOunces] = useState('');
  const [calories, setCalories] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { food, foodCategory, grams, ounces, calories };
      await fetch(`/api/meal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
          setSuccessMessage(`Successfully logged ${food}`);
          setFood('');
          setFoodCategory('');
          setGrams('');
          setOunces('');
          setCalories('');

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

  const inputGrams = grams => {
    const g = parseFloat(grams);
    const oz = (g / 28.35).toFixed(2);
    console.info(grams);
    setGrams(g.toString());
    setOunces(oz);
  };

  const inputOunces = ounces => {
    const oz = parseFloat(ounces);
    const g = (oz * 28.35).toFixed(2);
    setOunces(oz.toString());
    setGrams(g);
  };

  return (
    <>
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <Form>
                <Col lg="12" className="align-items-center justify-content-between row">
                  <h6 className="heading-small text-muted mb-4">Log a Meal</h6>
                  <span className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                    <i className="fas fa-chart-bar" />
                  </span>
                </Col>
                <Row>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="food">
                      Food
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="food"
                      placeholder="What did you eat?"
                      onChange={e => setFood(e.target.value)}
                      value={food}
                      type="text"
                    />
                  </Col>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="foodCategory">
                      Food Category
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="foodCategory"
                      placeholder="Carbs, Fruit, Fats..."
                      onChange={e => setFoodCategory(e.target.value)}
                      value={foodCategory}
                      type="text"
                    />
                  </Col>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="grams">
                      Grams
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="grams"
                      placeholder="Grams"
                      onChange={e => inputGrams(e.target.value)}
                      value={grams}
                      type="number"
                    />
                  </Col>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="ounces">
                      Ounces
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="ounces"
                      placeholder="Ounces"
                      onChange={e => inputOunces(e.target.value)}
                      value={ounces}
                      type="number"
                    />
                  </Col>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="calories">
                      Calories
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="calories"
                      placeholder="Calories"
                      onChange={e => setCalories(e.target.value)}
                      value={calories}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-end">
                  <Col lg="12" className="mt-3">
                    <button
                      className="btn btn-info bg-gradient-info w-100"
                      onClick={e => submitData(e)}
                    >
                      Log My Meal
                    </button>
                    {successMessage && (
                      <p className="text-center font-weight-700 text-info">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="text-center font-weight-700 text-warning">{errorMessage}</p>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default AddMeal;
