import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ProductData } from "../Data/ProductData";
import { NavLink } from "react-router-dom";
import { Check, StarFill } from "react-bootstrap-icons";
import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PaginationComponent from "../Components/PaginationComponent";

const Products = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();


    const [itemsPerPage] = useState(6);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = ProductData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(ProductData.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % ProductData.length;
        setItemOffset(newOffset);
    };

    const AddToWishlistButton = ({ product }) => {
        const found = wishlistItems.some((item) => item.productID === product.id);

        const handleAddToWishlist = (product) => {
            if (found) {
                toast.error(product.title + " is already in wishlist");
            } else {
                dispatch(addItemToWishlist(product));
                toast.success(product.title + " has been added into the wishlist");
            }
        };

        return (
            <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleAddToWishlist(product)}
            > {found && <Check size={20} />}
                Add To Wishlist
            </Button>
        );
    };

    return (
        <Container>



            {ProductData.length > itemsPerPage && (
                <PaginationComponent
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            )}
            <Row>
                {currentItems.map((product) => (
                    <Col md={4} key={product.id} className="g-3">
                        <Card className="h-100">
                            <Card.Body>
                                <NavLink to={`/products/${product.id}`}>
                                    <Card.Img variant="top" src={product.thumbnail} />
                                </NavLink>

                                <h5>{product.title}</h5>
                                <p className="text-muted mb-1">{product.brand}</p>
                                <h6>
                                    ₹{product.price}{" "}
                                    <small className="text-danger">
                                        -{product.discountPercentage}%
                                    </small>
                                </h6>
                                <p className="mb-1">
                                    {product.rating}
                                    <StarFill className="text-warning ms-2" />
                                </p>
                                <small
                                    className={
                                        product.availabilityStatus === "In Stock"
                                            ? "text-success"
                                            : "text-danger"
                                    }
                                >
                                    {product.availabilityStatus}
                                </small>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <Button size="sm" variant="outline-primary">
                                    Add to Cart
                                </Button>
                                <AddToWishlistButton product={product} />
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Products;