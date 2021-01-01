import React, {useState} from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Router, {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/client";
import Link from "next/link";

const Header: React.FC = () => {
  const [food, setFood] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [grams, setGrams] = useState("");
  const [ounces, setOunces] = useState("");
  const [calories, setCalories] = useState("");

  const [pounds, setPounds] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { food, foodCategory, grams, ounces, calories };
      await fetch(`/api/meal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
      setFood('');
      setFoodCategory('');
      setGrams('');
      setOunces('');
      setCalories('');
    } catch (error) {
      console.error(error);
    }
  };

  const submitWeight = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { pounds };
      await fetch(`/api/weight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
      setPounds('');
    } catch (error) {
      console.error(error);
    }
  };

  const inputGrams = (grams) => {
    const g = parseFloat(grams);
    const oz = (g / 28.35).toFixed(2);
    console.info(grams);
    setGrams(g.toString());
    setOunces(oz);
  }

  const inputOunces = (ounces) => {
    const oz = parseFloat(ounces);
    const g = (oz * 28.35).toFixed(2);
    setOunces(oz.toString());
    setGrams(g);
  }

  return (
      <>
        <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="12" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <Form>
                            <h6 className="heading-small text-muted mb-4">
                              Log a Meal
                            </h6>
                            <Row>
                              <Col lg="3">
                                <label className="form-control-label" htmlFor="food">Food</label>
                                <Input
                                    className="form-control-alternative"
                                    id="food"
                                    placeholder="What did you eat?"
                                    onChange={(e) => setFood(e.target.value)}
                                    value={food}
                                    type="text"
                                />
                              </Col>
                              <Col lg="3">
                                <label className="form-control-label" htmlFor="foodCategory">Food Category</label>
                                <Input
                                    className="form-control-alternative"
                                    id="foodCategory"
                                    placeholder="Carbs, Fruit, Fats..."
                                    onChange={(e) => setFoodCategory(e.target.value)}
                                    value={foodCategory}
                                    type="text"
                                />
                              </Col>
                              <Col lg="2">
                                <label className="form-control-label" htmlFor="grams">Grams</label>
                                <Input
                                    className="form-control-alternative"
                                    id="grams"
                                    placeholder="Grams"
                                    onChange={(e) => inputGrams(e.target.value)}
                                    value={grams}
                                    type="number"
                                />
                              </Col>
                              <Col lg="2">
                                <label className="form-control-label" htmlFor="ounces">Ounces</label>
                                <Input
                                    className="form-control-alternative"
                                    id="ounces"
                                    placeholder="Ounces"
                                    onChange={(e) => inputOunces(e.target.value)}
                                    value={ounces}
                                    type="number"
                                />
                              </Col>
                              <Col lg="2">
                                <label className="form-control-label" htmlFor="calories">Calories</label>
                                <Input
                                    className="form-control-alternative"
                                    id="calories"
                                    placeholder="Calories"
                                    onChange={(e) => setCalories(e.target.value)}
                                    value={calories}
                                    type="number"
                                />
                              </Col>
                            </Row>
                            <Row className="align-items-center justify-content-end">
                              <Col lg="2" className="mt-3">
                                <button className="btn btn-info" onClick={(e) => submitData(e)}>
                                  Log My Meal
                                </button>
                              </Col>
                            </Row>
                          </Form>
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
              <Row className="mt-3">
                <Col lg="12" xl="12">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <Form>
                            <h6 className="heading-small text-muted mb-4">
                              Log Your Weight
                            </h6>
                            <Row className="align-items-end">
                              <Col lg="4">
                                <label className="form-control-label" htmlFor="pounds">Weight</label>
                                <Input
                                    className="form-control-alternative"
                                    id="pounds"
                                    placeholder="How much do you weigh?"
                                    onChange={(e) => setPounds(e.target.value)}
                                    value={pounds}
                                    type="number"
                                />
                              </Col>
                              <Col lg="4">
                                <button className="btn btn-primary mb-1" onClick={(e) => submitWeight(e)}>
                                  Log My Meal
                                </button>
                              </Col>
                            </Row>
                          </Form>
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

}


export default Header;
