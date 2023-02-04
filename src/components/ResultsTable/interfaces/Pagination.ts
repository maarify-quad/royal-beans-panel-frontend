export interface Pagination {
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalPage: number;
  currentPage: number;
}
