import { Button, Container, Image, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromWishlist } from "../Store/Slice/WishlistSlice";
import { addToCart } from "../Store/Slice/CartSlice"; 
import { useOutletContext } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { darkMode } = useOutletContext(); 

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary"
    : "bg-light text-dark";

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 })); 
    dispatch(removeItemFromWishlist(item.id)); 
    toast.success(`${item.title} moved to cart`);
  };

  return (
    <Container className="my-4">
      <h1>❤️ Wishlist</h1>

      {wishlistItems?.length <= 0 ? (
        <div>There are no items added in your wishlist yet!!!</div>
      ) : (
        <Table
          bordered
          hover
          responsive
          className={darkMode ? "table-dark" : "table-light"}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className={themeClasses}>
                <td>
                  <Image
                    src={item.thumbnail}
                    style={{ width: "100px" }}
                    className="me-2"
                  />
                  {item.title}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant={darkMode ? "outline-light" : "outline-danger"}
                    onClick={() => {
                      dispatch(removeItemFromWishlist(item.id));
                      toast.info("Item has been removed from the wishlist");
                    }}
                    className="me-2"
                  >
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    variant={darkMode ? "outline-success" : "success"}
                    onClick={() => handleMoveToCart(item)}
                  >
                    Move to Cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ToastContainer theme={darkMode ? "dark" : "light"} />
    </Container>
  );
};

export default Wishlist;
