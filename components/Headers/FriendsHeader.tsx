import React, { useState } from 'react';

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Table,
} from 'reactstrap';

import AddMeal from '../Forms/AddMeal';
import AddWeight from '../Forms/AddWeight';
import AddWorkout from '../Forms/AddWorkout';
import prisma from '../../lib/prisma';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const FriendsHeader: React.FC = ({ handleFriends }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const searchForFriends = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { search };
      await fetch(`/api/friends/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
          setSearchResults(response);
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

  const addFriend = async (e: React.SyntheticEvent, friendId) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const body = { friendId };
      await fetch(`/api/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(response => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const friend = searchResults.find(element => element.id === friendId);
          handleFriends(friend);
          console.info(response);
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Card>
              <CardBody>
                <Row className="align-items-end">
                  <Col lg="8" xl="8">
                    <label className="form-control-label" htmlFor="search">
                      Search For Friends
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="search"
                      placeholder="Search name or email"
                      onChange={e => setSearch(e.target.value)}
                      value={search}
                      type="text"
                    />
                  </Col>
                  <Col lg="4">
                    <button
                      className="btn btn-primary bg-gradient-primary mb-1 w-100"
                      onClick={e => searchForFriends(e)}
                    >
                      Search
                    </button>
                    {successMessage && (
                      <p className="text-center font-weight-700 text-info">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="text-center font-weight-700 text-warning">{errorMessage}</p>
                    )}
                  </Col>
                </Row>
                <Row className="mt-4 mb-1">
                  {searchResults && searchResults.length > 0 ? (
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Add</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/*// @ts-ignore*/}
                        {searchResults.map(searchResult => (
                          <tr key={`user-${searchResult.id}`}>
                            <td>
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require('assets/img/theme/profile-placeholder.png')}
                                style={{ maxWidth: '25px' }}
                              />
                            </td>
                            <td>{searchResult.name ? searchResult.name : 'No Name'}</td>
                            <td>{searchResult.email}</td>
                            <td>
                              <button
                                className="btn btn-primary bg-gradient-orange w-auto"
                                onClick={e => addFriend(e, searchResult.id)}
                              >
                                Add friend
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h3 className="text-center w-100 text-indigo my-1">No Results Found</h3>
                  )}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FriendsHeader;
