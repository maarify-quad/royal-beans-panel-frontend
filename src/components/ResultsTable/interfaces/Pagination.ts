export interface Pagination {
  onPageChange: (page: number) => void;
  totalPage: number;
  currentPage: number;
}
