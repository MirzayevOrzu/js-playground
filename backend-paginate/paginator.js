export const paginator = (total, per_page, current_page, url) => {
  const total_page = Math.ceil(total / per_page);
  const offset = (current_page - 1) * per_page;

  const urls = [];
  let start;

  // Identify the start of the pagination
  if (current_page === 1) start = 1;
  else if (current_page === 2) start = 1;
  else if (current_page === total_page) start = current_page - 4;
  else if (current_page + 1 === total_page) start = current_page - 3;
  else start = current_page - 2;

  // Generate the pagination
  for (let i = 0; i < 5; i++) {
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
