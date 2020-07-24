import React, { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    item: 3,
  },
};

const CarouselLayout = (props) => {
    const { responseBook, isLoading } = props;

    return (
        <Fragment>
            <div style={{
                marginTop: '30px',
                marginBottom: '30px',
                marginLeft: '4vw',
                marginRight: '4vw',
            }}>
                <Carousel responsive={responsive}>
                    { isLoading ? (
                        <Skeleton style={{
                            width: '30vw',
                            height: '15vw',
                            borderRadius: '10px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                        }} />
                    ) : 
                    responseBook.map((data, key) => (
                        <img
                            key={key}
                            src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                            alt={`${data.title}`}
                            style={{
                                width: '30vw',
                                height: '15vw',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                            }}
                            onClick={() => props.history.push(`/description/${data.id}`)}
                        />
                    ))
                    }
                </Carousel>
            </div>
        </Fragment>
    );
};

const mapStateToProps = ({ book }) => {
    return {
        book,
    };
};

export default connect(mapStateToProps)(CarouselLayout);
