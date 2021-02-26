import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, CardHeader, Container, Row, Col } from 'reactstrap';
import { Line, Pie } from 'react-chartjs-2';
import { WeightProps } from '../Weight';
import { MealProps } from '../Meal';
import PropTypes from 'prop-types';
import { User } from 'next-auth';

type Props = {
  user: User;
};

const UserHeader: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '600px',
          backgroundImage: 'url(' + require('assets/img/theme/profile-cover.jpg') + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {user?.name || user?.email}!</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. Set a weight goal or update your profile!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
