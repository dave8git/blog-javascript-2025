// eslint-disable-next-line no-unused-vars
const calculateTagsParams = function(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for(let tag in tags) {
    if(tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if(tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params; 
};