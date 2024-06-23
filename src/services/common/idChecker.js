const isIdValid = (id) => {
  return id && !isNaN(id) && id > 0;
};

export default isIdValid;