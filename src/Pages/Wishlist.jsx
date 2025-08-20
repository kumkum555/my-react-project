import { Button, Container, Image, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromWishlist } from "../Store/Slice/WishlistSlice"; // <-- apne slice ka path check karo

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <Container>
      <h1>Wishlist</h1>
      {wishlistItems?.length <= 0 ? (
        <div>There are no items added in your wishlist yet!!!</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="border">
                <td>
                  <Image src={item.thumbnail} style={{ width: "100px" }} />
                  {item.title}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => {
                      dispatch(removeItemFromWishlist(item.id));
                      toast.info("Item has been removed from the wishlist");
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Wishlist;
