import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToCart } from "../Store/Slice/CartSlice";
import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
import { ProductData } from "../Data/ProductData";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = ProductData.find((p) => p.id === parseInt(id));
  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }


  const images = [product.thumbnail, ...(product.images || [])];
  const [activeIndex, setActiveIndex] = useState(0);


  const checkAuth = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("⚠️ Please login/register first.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!checkAuth()) return;
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart ✅`);
  };

  const handleAddToWishlist = () => {
    if (!checkAuth()) return;
    dispatch(addItemToWishlist(product));
    toast.success(`${product.title} added to wishlist ❤️`);
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-start">
      
        <Col md={5} className="text-center">
        
          <Carousel
            activeIndex={activeIndex}
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            interval={null} 
            indicators={false} 
          >
            {images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={img}
                  alt={`slide-${idx}`}
                  className="d-block w-100 rounded shadow-sm"
                  style={{ maxHeight: "350px", objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

        
          <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`img-thumbnail ${
                  activeIndex === idx ? "border border-primary" : ""
                }`}
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </Col>

       
        <Col md={7}>
          <h2>{product.title}</h2>
          <h5 className="text-muted">{product.brand}</h5>
          <h4 className="text-success">₹{product.price}</h4>
          <p>
            <strong>Discount:</strong> {product.discountPercentage}%
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {product.rating}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} items
          </p>

          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button
            variant="outline-danger"
            className="ms-2"
            onClick={handleAddToWishlist}
          >
            Add to Wishlist
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
