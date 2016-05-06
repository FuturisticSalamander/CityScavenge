export const moveUser = (lat, lng) => {
  return {
    type: 'MOVE_USER',
    lat,
    lng,
  };
};

export const finishLine = (lat, lng) => {
  return {
    type: 'FINISH_ LINE',
    lat,
    lng,
  };
};
