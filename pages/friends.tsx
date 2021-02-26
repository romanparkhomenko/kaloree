import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { MealProps } from '../components/Meal';
import prisma from '../lib/prisma';
import { getSession, useSession } from 'next-auth/client';
import Admin from '../layouts/Admin';
import Header from '../components/Headers/Header';
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
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import FriendsHeader from '../components/Headers/FriendsHeader';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const friends = await prisma.friends.findMany({
    where: {
      user: { email: session.user.email },
    },
    select: {
      id: true,
      friendId: true,
    },
  });

  console.info(friends);

  const userFriends = await Promise.all(
    friends.map(async friend => {
      const res = await prisma.user.findUnique({
        where: {
          id: friend.friendId,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return res;
    }),
  );

  return {
    props: { friends, userFriends },
  };
};

type Props = {
  friends: [];
  userFriends: [];
};

const Friends: React.FC<Props> = props => {
  const { friends, userFriends } = props;

  userFriends.map((friend, index) => {
    friend.relationshipId = friends[index].id;
  });

  const [friendsList, setFriendsList] = useState(userFriends);

  const handleFriends = friend => {
    const newFriendsList = friends;
    newFriendsList.push(friend);
    setFriendsList(newFriendsList);
  };

  const removeFriend = async (e: React.SyntheticEvent, friendId) => {
    e.preventDefault();
    try {
      await fetch(`/api/friends/${friendId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(response => {
          console.info(response);
        })
        .catch(error => {
          console.info(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <Container>
          <Row className="flex-column align-items-center justify-content-center">
            <h1 className="text-black-50 text-center">Whoops!</h1>
            <p className="text-black-50 text-center">
              You need to be authenticated to view this page.
            </p>
            <a href="/login" className="btn btn-default">
              Login
            </a>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Admin>
      <FriendsHeader handleFriends={handleFriends} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className="col">
                  <h3 className="mb-0">My Friends</h3>
                </div>
              </CardHeader>
              <CardBody>
                {friendsList && friendsList.length > 0 ? (
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Summary</th>
                        <th scope="col">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {friendsList &&
                        friendsList.map(friend => (
                          <tr key={`user-${friend.id}`}>
                            <td>
                              <img
                                alt="..."
                                className="rounded-circle"
                                src={require('assets/img/theme/profile-placeholder.png')}
                                style={{ maxWidth: '25px' }}
                              />
                            </td>
                            <td>{friend.name ? friend.name : 'No Name'}</td>
                            <td>{friend.email}</td>
                            <td>
                              <a
                                className="btn btn-primary bg-gradient-primary w-auto"
                                href={`/summary/${friend.id}`}
                              >
                                See Summary
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary bg-gradient-warning w-auto"
                                onClick={e => removeFriend(e, friend.relationshipId)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : (
                  <h3 className="text-center w-100 text-indigo my-1">No Results Found</h3>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default Friends;
