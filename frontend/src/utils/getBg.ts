function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const convertUnsplashToOptions = (unsplashData) => {
  if (!unsplashData) return [];
  const res = [];

  unsplashData.forEach((entry) => {
    res.push([entry.urls.small, true, entry.urls.full]);
  });

  return res;
};

export const getBoardBackgroundOptions = (unsplashData) => {
  if (!unsplashData) return [];
  const res = [
    // item[0] is color or url; item[1] true if image, false if color, item[2] is full image url if applicable
    ["#4680FF", false],
    ["red", false],
    ["#FFB64D", false],
  ];

  const unsplashDataTransformed = convertUnsplashToOptions(unsplashData);
  res.push(...unsplashDataTransformed);

  shuffleArray(res);
  for (let i = 0; i < 5; i++) res.pop();
  return res;
};

export const getAddBoardStyle = (bg, img = true) => {
  if (img)
    return {
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  return { backgroundColor: bg };
};
