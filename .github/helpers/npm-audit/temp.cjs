const path = require("path");
const directoryPaths = JSON.parse(process.env.directoryPaths);

directoryPaths.map((dirPath) => {
  console.log(path.resolve(__dirname, `../../../${dirPath}`));
});
