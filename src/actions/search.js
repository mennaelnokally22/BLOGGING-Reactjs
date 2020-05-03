const setSearchText = (searchText) => ({
  type: 'SET_SEARCH_TEXT',
  searchText,
});

const setActiveFilter = (activeFilter) => ({
  type: 'SET_ACTIVE_FILTER',
  activeFilter,
});

export { setSearchText, setActiveFilter };
