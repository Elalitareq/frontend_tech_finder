import { Pagination } from "@mui/material";

const CustomPagination = ({ currentPage, totalPages, onPageChange,className }) => {
    return (
      <Pagination
      color="primary"
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        className={className}
      />
    );
  };
  
  export default CustomPagination;
  