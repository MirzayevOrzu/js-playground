export const paginator = (total, per_page, current_page, url, pl) => {
  // Pagination length has to be an odd number
  pl = pl % 2 === 0 ? pl + 1 : pl;
  const total_page = Math.ceil(total / per_page);
  const offset = (current_page - 1) * per_page;

  const urls = [];
  let start;
  let pag_padding = (pl - 1) / 2;

  // Identify the start of the pagination from start
  for (let i = 1; i <= pag_padding; i++) {
    if (current_page - i < 1) {
      start = 1;
      break;
    }
  }

  // Identify the start of the pagination from end
  for (let i = 0; i < pag_padding; i++) {
    if (current_page + i === total_page) {
      start = current_page - 2 * pag_padding + i;
      break;
    }
  }

  if (!start) {
    start = current_page - pag_padding;
  }

  // Generate the pagination
  for (let i = 0; i < pl; i++) {
    urls.push({
      active: current_page === start + i ? true : false,
      label: start + i,
      url: `${url}?page=${start + i}`,
    });
  }

  // Previous page
  urls.unshift({
    active: false,
    label: 'pagination.prev',
    url: current_page - 1 ? `${url}?page=${current_page - 1}` : null,
  });

  // Next page
  urls.push({
    active: false,
    label: 'pagination.next',
    url:
      current_page + 1 > total_page ? null : `${url}?page=${current_page + 1}`,
  });

  return {
    total,
    current_page,
    per_page,
    from: offset + 1,
    to: offset + per_page,
    first_page_url: `${url}?page=1`,
    last_page_url: `${url}?page=${total_page}`,
    urls,
  };
};
