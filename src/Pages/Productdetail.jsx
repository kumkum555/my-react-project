import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../Store/Slice/CartSlice";
import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
import { ProductData } from "../Data/ProductData";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = ProductData.find((p) => p.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product?.thumbnail); 

  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }

  return (
    <Container className="mt-5">
      <Row className="align-items-start">
        
        <Col md={5} className="text-center">
         
          <img
            src={mainImage}
            alt={product.title}
            className="img-fluid w-75 rounded shadow-sm mb-3"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />

         
          <div className="d-flex justify-content-center flex-wrap gap-2">
            {[product.thumbnail, ...(product.images || [])].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className="img-thumbnail"
                style={{
                  width: "60px",
                  height: "60px",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
                onClick={() => setMainImage(img)}
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

          <Button
            variant="primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline-danger"
            className="ms-2"
            onClick={() => dispatch(addItemToWishlist(product))}
          >
            Add to Wishlist
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
