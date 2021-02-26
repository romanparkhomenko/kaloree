import React, { useState } from 'react';

import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Router, { useRouter } from 'next/router';

const AddWorkout: React.FC = () => {
  const [workout, setWorkout] = useState('');
  const [minutes, setMinutes] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const [weight, setWeight] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { workout, minutes, caloriesBurnt, weight };
      await fetch(`/api/workout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
          setSuccessMessage(`Successfully logged ${workout}`);
          setWorkout('');
          setMinutes('');
          setCaloriesBurnt('');
          setWeight('');
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

  return (
    <>
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <Form>
                <Col lg="12" className="align-items-center justify-content-between row">
                  <h6 className="heading-small text-muted mb-4">Log a Workout</h6>
                  <span className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                    <i className="ni ni-user-run" />
                  </span>
                </Col>
                <Row>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="workout">
                      Workout
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="workout"
                      placeholder="What kind of workout did you do?"
                      onChange={e => setWorkout(e.target.value)}
                      value={workout}
                      type="text"
                    />
                  </Col>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="minutes">
                      Minutes
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="minutes"
                      placeholder="How long did you workout?"
                      onChange={e => setMinutes(e.target.value)}
                      value={minutes}
                      type="number"
                    />
                  </Col>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="caloriesBurnt">
                      Calories Burnt
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="caloriesBurnt"
                      placeholder="Calories Burnt"
                      onChange={e => setCaloriesBurnt(e.target.value)}
                      value={caloriesBurnt}
                      type="number"
                    />
                  </Col>
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="weight">
                      Weight
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="weight"
                      placeholder="How much weight did you lift?"
                      onChange={e => setWeight(e.target.value)}
                      value={weight}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-end">
                  <Col lg="12" className="mt-3">
                    <button
                      className="btn btn-info bg-gradient-orange w-100"
                      onClick={e => submitData(e)}
                    >
                      Log My Workout
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

export default AddWorkout;
