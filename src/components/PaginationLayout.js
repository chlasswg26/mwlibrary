import React, { Fragment } from 'react';
import { Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';

const PaginationLayout = (props) => {
    return (
        <Fragment>
            <Pagination size='sm'>
                { props.pagination.map((data, key) => (
                    <Fragment key={key}>
                        { data.pages[0].previous && (
                            <Pagination.Prev
                                key={key + data.pages[0].previous}
                                onClick={props.handlePage}
                                id={data.pages[0].previous}
                            ></Pagination.Prev>
                        ) }
                        { data.pages[0].current && (
                            <Pagination.Item
                                key={key + data.pages[0].current}
                                onClick={props.handlePage}
                                id={data.pages[0].current}
                                active
                            >
                                {data.pages[0].current}
                            </Pagination.Item>
                        ) }
                        { data.pages[0].next && (
                            <Pagination.Next
                                key={key + data.pages[0].next}
                                onClick={props.handlePage}
                                id={data.pages[0].next}
                            ></Pagination.Next>
                        ) }
                    </Fragment>
                )) }
            </Pagination>
        </Fragment>
    );
};

const mapStateToProps = ({ book }) => {
    return {
        book,
    };
};

export default connect(mapStateToProps)(PaginationLayout);