import React, {
    Fragment,
    useEffect,
    useCallback,
} from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Table,
    Image,
    Alert,
} from 'react-bootstrap';
import NavbarLayout from '../components/NavbarLayout';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
// import 'moment/locale/id'; // optional locale language
import { connect } from 'react-redux';
import {
    getHistoryActionCreator,
    getHistoryByUserIdActionCreator,
} from '../redux/actions/history';
import { logoutActionCreator } from '../redux/actions/logout';

const History = (props) => {
    const {
      history,
      historys,
      getHistoryAction,
      getHistoryByUserIdAction,
    } = props;
    
    const role = atob(localStorage.getItem('role'));
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    const dispatchHistory = useCallback(async () => {
      switch (role) {
        case '1':
          getHistoryByUserIdAction(id, token);
          break;
        case '2':
          getHistoryAction(token);
          break;
        default:
          break;
      }
    }, [getHistoryAction, getHistoryByUserIdAction, id, role, token]);

    useEffect(() => {
        dispatchHistory();
    }, [dispatchHistory]);

    const dispatchLogout = async () => {
        localStorage.clear();
        const { logoutAction } = props;
        await logoutAction();
        history.push('/auth/signin');
    };

    if (!token) {
      return (
        <Redirect to='/' />
      );
    }

    return (
        <Fragment>
          <NavbarLayout
            toWhere={dispatchLogout}
            search={null}
            toHome={() => history.push('/')}
            toManage={() => history.push('/manage')}
            toHistory={() => history.push('/history')}
            toMyBook={() => history.push('/book')}
          />
          <Container style={{ marginTop: '20px' }}>
            <Row>
              <Col>
                <h1 style={{ textAlign: 'center' }}>Order History</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }}>
                <Table responsive='xl'>
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th></th>
                      { (role === '2') && (
                        <Fragment>
                          <th>User</th>
                        </Fragment>
                      ) }
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    { (historys.isLoading || !historys.isFulfilled) ? (
                      <tr>
                        <td style={{ width: '200px' }}><Skeleton /></td>
                        <td style={{ width: '200px' }}><Skeleton width={101} height={150} /></td>
                        { role === '2' && (
                          <td style={{ width: '200px' }}><Skeleton /></td>
                        ) }
                        <td style={{ width: '100px' }}><Skeleton /></td>
                        <td style={{ width: '200px' }}><Skeleton /></td>
                      </tr>
                    )
                    :
                    historys.response.map((data, key) => (
                    <tr key={key}>
                      <td style={{ width: '200px' }}>{data.book}</td>
                      <td style={{ width: '200px' }}>
                        <Image
                          src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                          rounded
                          style={{ width: '101px', height: '150px' }}
                        />
                      </td>
                      {role === '2' && (
                        <Fragment>
                          <td>{data.user}</td>
                        </Fragment>
                      )}
                      <td style={{ width: '100px' }}>
                        {data.status === '2'
                          ? (
                            <Alert variant='success'>
                              Returned
                            </Alert>
                          )
                          : (
                            <Alert variant='dark'>
                              Borrowed
                            </Alert>
                          )}
                      </td>
                      <td style={{ width: '150px' }}>
                        {moment(data.created).format('LLLL')}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Fragment>
    );
};

const mapStateToProps = ({ historys }) => {
  return {
    historys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryAction: (token) => {
      dispatch(getHistoryActionCreator(token));
    },
    getHistoryByUserIdAction: (id, token) => {
      dispatch(getHistoryByUserIdActionCreator(id, token));
    },
    logoutAction: () => {
      dispatch(logoutActionCreator());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
