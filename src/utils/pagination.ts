class Pagination {
    getCondition(page = 1, pageSize?: number): { skip?: number; take?: number } {
      if (!pageSize) {
        return {};
      }
  
      return {
        skip: pageSize * (page - 1),
        take: pageSize
      };
    }
  
    getResponse(total: number, page = 1, pageSize?: number) {
      pageSize = pageSize || total;
  
      return {
        page,
        page_size: pageSize,
        total,
        total_pages: pageSize === 0 ? 0 : Math.ceil(total / pageSize)
      };
    }
  }
  
  export const paginationUtils = new Pagination();