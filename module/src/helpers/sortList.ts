export const sortList = (listToSort: any[], sortBy: string, sortDirection: string) => {
  return listToSort.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'updated_at') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }

    return sortDirection === 'asc'
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });
};
