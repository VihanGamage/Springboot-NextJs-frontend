import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }  
  
  export function Paginations({ totalPages, currentPage, setCurrentPage }:PaginationProps) {
    const pages = [...Array(totalPages).keys()]; // [0, 1, 2, ...]

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
            href="#" 
            onClick={() => 
              currentPage > 0 && setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>

          {pages.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

          <PaginationItem>
            <PaginationNext 
            href="#" 
            onClick={() =>
              currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)
            }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  