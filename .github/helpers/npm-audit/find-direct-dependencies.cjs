const fs = require("fs");
const path = require("path");

// Function to find direct dependencies of a specified dependency
const findDirectDependencies = (dependencyName, directoryPath) => {
  // Read and parse the package-lock.json file
  const packageLock = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../../../${directoryPath}/package-lock.json`),
      "utf-8"
    )
  );
  const packageJson = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../../../${directoryPath}/package.json`),
      "utf-8"
    )
  );

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const packages = packageLock.packages || {};
  const directDependencies = new Set();

  // Check if the specified dependency is a direct dependency
  const isDirect = dependencies.hasOwnProperty(dependencyName);

  // Function to find dependencies iteratively using a stack
  const findDependencies = (startPackage) => {
    const stack = [startPackage];
    const visited = new Set();

    while (stack.length > 0) {
      const { packageName, path } = stack.pop();
      if (visited.has(packageName)) continue;
      visited.add(packageName);

      const currentPackage = packages[packageName];
      if (!currentPackage || !currentPackage.dependencies) continue;

      for (const name of Object.keys(currentPackage.dependencies)) {
        const packageKey = `node_modules/${name}`;
        if (!visited.has(packageKey)) {
          stack.push({ packageName: packageKey, path: [...path, name] });
        }
        if (name !== dependencyName && dependencies.hasOwnProperty(name)) {
          directDependencies.add(name);
        }
      }
    }
  };

  // Check direct dependencies in the root package
  const rootPackage = packages[""] || {};
  const rootDependencies = {
    ...rootPackage.dependencies,
    ...rootPackage.devDependencies,
  };

  // If the specified dependency is a direct dependency, do nothing
  if (!isDirect) {
    // Iterate through each root dependency and find the specified dependency
    for (const rootDep in rootDependencies) {
      const packageKey = `node_modules/${rootDep}`;
      findDependencies({ packageName: packageKey, path: [rootDep] });
    }
  }

  // Return the result indicating if it's a direct dependency and the direct dependencies
  return {
    isDirect,
    directDependencies: Array.from(directDependencies),
  };
};

module.exports = findDirectDependencies;
