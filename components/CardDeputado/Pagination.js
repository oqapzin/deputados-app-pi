import { Pagination } from "@mui/material";

const PaginationComponent = ({ items, currentPage, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); 

  if (pagesCount === 1) return null;

  return (
    <Pagination count={pagesCount} page={currentPage} showFirstButton showLastButton variant="outlined" shape="rounded" onChange={onPageChange} />
  );
};


export default PaginationComponent