export function sortData(data, sortOption) {
  switch (sortOption) {
    case "az":
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return data.sort((a, b) => b.title.localeCompare(a.title));
    case "oldest":
      return data.sort(
        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
      );
    case "oldest":
      return data.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    default:
      return data;
  }
}
