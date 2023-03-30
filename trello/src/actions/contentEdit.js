export const handleContentAfterEnter = (e) => {
  if (e.key === "Enter") {
    e.target.blur();
  }
};

export const handleSelectAllText = (e) => {
  e.target.focus();
  e.target.select();
};
