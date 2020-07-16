import React, {
    Fragment,
    useEffect,
} from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Image,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    getHistoryActionCreator,
    getHistoryByUserIdActionCreator,
} from '../redux/actions/history';
import { logoutActionCreator } from '../redux/actions/logout';

const History = (props) => {
    const {
      history,
      getHistoryAction,
      getHistoryByUserIdAction,
    } = props;
    
    const role = atob(localStorage.getItem('role'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        
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
    }, [getHistoryAction, getHistoryByUserIdAction, role]);

    return (
        <Fragment>
            <Container style={{ marginTop: "20px" }}>
            <Row>
              <Col>
                <h1 style={{ textAlign: "center" }}>Order History</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col lg={{ span: 10, offset: 1 }}>
                <Table responsive="xl">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Book Poster</th>
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
                    {history.response.map((data, key) => (
                      <tr key={key}>
                        <td style={{ width: "200px" }}>{data.book}</td>
                        <td style={{ width: "200px" }}>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                            rounded
                            style={{ width: "101px", height: "150px" }}
                          />
                        </td>
                        {role === '2' ? (
                          <>
                            <td>{data.user}</td>
                          </>
                        ) : null}
                        <td style={{ width: "150px" }}>
                          {new Date(data.created).toLocaleDateString()}
                        </td>
                        <td style={{ width: "150px" }}>
                          {data.status === '2'
                            ? new Date(data.created).toLocaleDateString()
                            : ""}
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

const mapStateToProps = ({ history }) => {
  return {
    history,
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
