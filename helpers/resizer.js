const jimp = require("jimp");

const resizer = async (path) => {
  try {
    const image = await jimp.read(path);
    await image.contain(250, 250);
    await image.resize(250, 250);
    await jimp.writeAsync(path);
  } catch (e) {
    console.error(e);
  }
};
module.exports = resizer;
