const getBGColor = (id) => {
  const colors = ["red", "green", "blue", "orange", "purple", "gray", "teal"];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

export default getBGColor;
