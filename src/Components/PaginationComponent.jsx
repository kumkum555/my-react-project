import ReactPaginate from "react-paginate";
import { Row, Col } from "react-bootstrap";

const PaginationComponent = ({ pageCount, handlePageClick }) => {
  return (
    <Row className="mt-4">
      <Col md={12} className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </Col>
    </Row>
  );
};

export default PaginationComponent;
