import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { WeightProps } from '../Weight';
import { MealProps } from '../Meal';
import PropTypes from 'prop-types';

type Props = {
  meals: MealProps[];
  weights: WeightProps[];
};

const SummaryHeader: React.FC<Props> = ({ meals, weights }) => {
  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Traffic
                  </CardTitle>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <Line data={meals} />
                        <Line data={weights} />
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
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
