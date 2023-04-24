function sortData(data, sortOption) {
  switch (sortOption) {
    case "title-a-z":
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case "title-z-a":
      return data.sort((a, b) => b.title.localeCompare(a.title));
    case "created_at-newest":
      return data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    case "created_at-oldest":
      return data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    default:
      return data;
  }
}
