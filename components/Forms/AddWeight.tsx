import React, { useState } from 'react';

import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Router, { useRouter } from 'next/router';

const AddWeight: React.FC = () => {
  const [pounds, setPounds] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitWeight = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { pounds };
      await fetch(`/api/weight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
          setSuccessMessage('Successfully logged weight');
          setPounds('');
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
                  <h6 className="heading-small text-muted mb-4">Log your Weight</h6>
                  <span className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                    <i className="ni ni-active-40" />
                  </span>
                </Col>
                <Row className="align-items-end">
                  <Col lg="12">
                    <label className="form-control-label" htmlFor="pounds">
                      Weight
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="pounds"
                      placeholder="How much do you weigh?"
                      onChange={e => setPounds(e.target.value)}
                      value={pounds}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-end">
                  <Col lg="12" className="mt-3">
                    <button
                      className="btn btn-primary bg-gradient-primary mb-1 w-100"
                      onClick={e => submitWeight(e)}
                    >
                      Log My Weight
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

export default AddWeight;
