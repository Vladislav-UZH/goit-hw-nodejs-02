const Jimp = require("jimp");
// console.log(Jimp.read());
const resizer = async (path) => {
  try {
    console.log(path)
    const image = await Jimp.read(path);
    await image.contain(250, 250);
    await image.resize(250, 250);
    await image.writeAsync(path);
  } catch (e) {
    console.error(e);
  }
};
module.exports = resizer;
