import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Check, StarFill } from "react-bootstrap-icons";
import { toast, ToastContainer } from "react-toastify";
import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
import { addToCart } from "../Store/Slice/CartSlice";
import PaginationComponent from "../Components/PaginationComponent";

const Categories = () => {
  const { slug } = useParams();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const [itemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setItemOffset(0); 
      });
  }, [slug]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
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
      >
        {found && <Check size={20} />} Add To Wishlist
      </Button>
    );
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-capitalize">{slug} Products</h3>

      
      {products.length > itemsPerPage && (
        <PaginationComponent
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}

      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <Col md={4} key={product.id} className="g-3">
              <Card className="h-100">
                <NavLink to={`/product/${product.id}`}>
                  <Card.Img variant="top" src={product.thumbnail} />
                </NavLink>
                <Card.Body>
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
                    {product.availabilityStatus || "In Stock"}
                  </small>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => dispatch(addToCart(product))} 
                  >
                    Add to Cart
                  </Button>
                  <AddToWishlistButton product={product} />
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Categories;
