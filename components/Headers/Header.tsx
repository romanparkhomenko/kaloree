import React, { useState } from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';

import AddMeal from '../Forms/AddMeal';
import AddWeight from '../Forms/AddWeight';
import AddWorkout from '../Forms/AddWorkout';

const Header: React.FC = () => {
  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="4" xl="4">
                <AddMeal />
              </Col>
              <Col lg="4" xl="4">
                <AddWorkout />
              </Col>
              <Col lg="4" xl="4">
                <AddWeight />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
