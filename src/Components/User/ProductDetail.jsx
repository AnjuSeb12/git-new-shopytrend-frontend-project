// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
// import AddCart from './AddCart';
// import Cookies from 'js-cookie'; // Assuming you are using js-cookie to handle cookies

// const ProductDetail = () => {
//     const { id } = useParams();
//     const [currentItem, setCurrentItem] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const [newReview, setNewReview] = useState({ rating: '', comment: '' });
//     const [loading, setLoading] = useState(false);
//     const [isSubmittingReview, setIsSubmittingReview] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if the user is logged in
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProductAndReviews = async () => {
//             setLoading(true);
//             try {
//                 // Fetch product details
//                 const productResponse = await axios.get(`http://localhost:4000/api/v1/product/products/${id}`);
//                 setCurrentItem(productResponse.data);

//                 // Fetch reviews
//                 const reviewsResponse = await axios.get(`http://localhost:4000/api/v1/review/product/${id}`);
//                 setReviews(reviewsResponse.data.reviews);
//             } catch (error) {
//                 console.error("Error fetching product or reviews:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProductAndReviews();

//         // Check if the user is logged in (assuming you store a token in cookies)
//         const userToken = Cookies.get('token');
//         if (userToken) {
//             setIsLoggedIn(true);
//         }
//     }, [id]);

//     const handlePayNow = (currentItem) => {
//         navigate('/order-form', { state: { product: currentItem } });
//     };

//     const handleReviewChange = (e) => {
//         const { name, value } = e.target;
//         setNewReview((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmitReview = async (e) => {
//         e.preventDefault();
//         setIsSubmittingReview(true);
//         try {
//             const response = await axios.post(`http://localhost:4000/api/v1/review/product/${id}`, {
//                 rating: newReview.rating,
//                 comment: newReview.comment,
//             }, { withCredentials: true });

//             // Add the new review to the state
//             setReviews((prev) => [response.data.review, ...prev]);
//             setNewReview({ rating: '', comment: '' });
//         } catch (error) {
//             console.error("Error submitting review:", error);
//         } finally {
//             setIsSubmittingReview(false);
//         }
//     };

//     if (loading) {
//         return <Container>Loading...</Container>;
//     }

//     return (
//         <Container className="product-details my-5">
//             {currentItem && (
//                 <Row>
//                     <Col md={6} className="d-flex justify-content-center">
//                         <img src={currentItem.image} alt={currentItem.title} className="img-fluid"
//                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
//                     </Col>

//                     <Col md={6}>
//                         <h1>{currentItem.title}</h1>
//                         <p>{currentItem.description}</p>
//                         <h3 className="text-success">${currentItem.price}</h3>

//                         <div className="d-flex align-items-center mb-3">
//                             <AddCart product={currentItem} disabled={currentItem.stock <= 0} />
//                             <Button variant="success" className="ms-3" onClick={() => handlePayNow(currentItem)}>
//                                 Pay Now
//                             </Button>
//                         </div>

//                         <div className="reviews-section mt-4">
//                             <h3>Reviews</h3>
//                             <ListGroup className="mt-4">
//                                 {reviews.length > 0 ? (
//                                     reviews.map((review) => (
//                                         <ListGroup.Item key={review._id} className="mb-3 p-4 border rounded shadow-sm">
//                                             <h5 className="fw-bold">{review.user.name}</h5>
//                                             <p>Rating: {review.rating}</p>
//                                             <p>{review.comment}</p>
//                                             <p className="text-muted">Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
//                                         </ListGroup.Item>
//                                     ))
//                                 ) : (
//                                     <ListGroup.Item>No reviews yet.</ListGroup.Item>
//                                 )}
//                             </ListGroup>

//                             {isLoggedIn && (
//                                 <div className="mt-4">
//                                     <h3>Add a Review</h3>
//                                     <Form onSubmit={handleSubmitReview} className="p-4 border rounded bg-light">
//                                         <Form.Group controlId="rating" className="mb-3">
//                                             <Form.Label>Rating (1-5)</Form.Label>
//                                             <Form.Control
//                                                 type="number"
//                                                 name="rating"
//                                                 value={newReview.rating}
//                                                 onChange={handleReviewChange}
//                                                 min="1"
//                                                 max="5"
//                                                 placeholder="Enter a rating from 1 to 5"
//                                                 required
//                                             />
//                                         </Form.Group>
//                                         <Form.Group controlId="comment" className="mb-3">
//                                             <Form.Label>Comment</Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 name="comment"
//                                                 value={newReview.comment}
//                                                 onChange={handleReviewChange}
//                                                 rows={3}
//                                                 placeholder="Write your review here"
//                                                 required
//                                             />
//                                         </Form.Group>
//                                         <Button
//                                             variant="primary"
//                                             type="submit"
//                                             disabled={isSubmittingReview}
//                                             className="mt-3"
//                                         >
//                                             {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
//                                         </Button>
//                                     </Form>
//                                 </div>
//                             )}
//                         </div>
//                     </Col>
//                 </Row>
//             )}
//         </Container>
//     );
// };

// export default ProductDetail;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import AddCart from './AddCart';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie to handle cookies

const ProductDetail = () => {
    const { id } = useParams();
    const [currentItem, setCurrentItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [loading, setLoading] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if the user is logged in
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            setLoading(true);
            try {
                // Fetch product details
                const productResponse = await axios.get(`http://localhost:4000/api/v1/product/products/${id}`);
                setCurrentItem(productResponse.data);

                // Fetch reviews
                const reviewsResponse = await axios.get(`http://localhost:4000/api/v1/review/product/${id}`);
                setReviews(reviewsResponse.data.reviews);
            } catch (error) {
                console.error("Error fetching product or reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndReviews();

        // Check if the user is logged in (assuming you store a token in cookies)
        const userToken = Cookies.get('token');
        if (userToken) {
            setIsLoggedIn(true);
        }
    }, [id]);

    const handlePayNow = (currentItem) => {
        navigate('/order-form', { state: { product: currentItem } });
    };

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsSubmittingReview(true);
        try {
            const response = await axios.post(`http://localhost:4000/api/v1/review/product/${id}`, {
                rating: newReview.rating,
                comment: newReview.comment,
            }, { withCredentials: true });

            // Add the new review to the state
            setReviews((prev) => [response.data.review, ...prev]);
            setNewReview({ rating: '', comment: '' });
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container className="product-details my-5">
            {currentItem && (
                <>
                    <Row>
                        <Col md={6} className="d-flex justify-content-center align-items-center">
                            <img src={currentItem.image} alt={currentItem.title} className="img-fluid"
                                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                        </Col>

                        <Col md={6}>
                            <h1>{currentItem.title}</h1>
                            <p>{currentItem.description}</p>
                            <h3 className="text-success">₹{currentItem.price}</h3>

                            <div className="d-flex align-items-center mb-3">
                                <AddCart product={currentItem} disabled={currentItem.stock <= 0} />
                                <Button variant="success" className="ms-3" onClick={() => handlePayNow(currentItem)}>
                                    Pay Now
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col>
                            <div className="reviews-section">
                                <h3>Reviews</h3>
                                <ListGroup className="mt-4">
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <ListGroup.Item key={review._id} className="mb-3 p-4 border rounded shadow-sm">
                                                <h5 className="fw-bold">{review.user.name}</h5>
                                                <p>Rating: {review.rating}</p>
                                                <p>{review.comment}</p>
                                                <p className="text-muted">Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No reviews yet.</ListGroup.Item>
                                    )}
                                </ListGroup>

                                {isLoggedIn && (
                                    <div className="mt-4">
                                        <h3>Add a Review</h3>
                                        <Form onSubmit={handleSubmitReview} className="p-4 border rounded bg-light">
                                            <Form.Group controlId="rating" className="mb-3">
                                                <Form.Label>Rating (1-5)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="rating"
                                                    value={newReview.rating}
                                                    onChange={handleReviewChange}
                                                    min="1"
                                                    max="5"
                                                    placeholder="Enter a rating from 1 to 5"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="mb-3">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="comment"
                                                    value={newReview.comment}
                                                    onChange={handleReviewChange}
                                                    rows={3}
                                                    placeholder="Write your review here"
                                                    required
                                                />
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={isSubmittingReview}
                                                className="mt-3"
                                            >
                                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ProductDetail;

