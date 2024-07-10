const enhanceVulnerabilityList = require("./enhance-vulnerability-list.cjs");
const findIndirectVulnerableDependencies = require("./find-indirect-vulnerable-deps.cjs");
const runNpmAudit = require("./run-npm-audit.cjs");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Requires semver dependency to run.

const LOCAL_TEST = false;
const TEST_DIR_PATHS = ["."];

/**
 * THIS FILE DOES NOT REQUIRE ANY EDITING.
 * Place within .github/helpers/npm-audit/
 *
 * To test this file locally,
 * - Set LOCAL_TEST variable to true.
 * - Edit TEST_DIR_PATHS if necessary.
 * - From root, run "node .github/helpers/npm-audit/parse-npm-vulnerabilities.cjs > vulnerabilities.json"
 * - Check the vulnerabilities.json file, then delete it.
 */

// Get directory paths from env.
const directoryPaths = LOCAL_TEST
  ? TEST_DIR_PATHS
  : JSON.parse(process.env.directoryPaths);

// Save results to json.
let results = {};

(async () => {
  // Create an array of promises for each dirPath.
  const promises = directoryPaths.map(async (dirPath) => {
    const resolvedPath = path.resolve(__dirname, `../../../${dirPath}`);
    execSync("npm i", { cwd: resolvedPath });

    if (!fs.existsSync(path.join(resolvedPath, "package-lock.json"))) {
      console.error(`package-lock.json not found in ${resolvedPath}`);
      return;
    }

    try {
      const auditResult = await runNpmAudit(dirPath);
      const auditResultWithParentDeps =
        await findIndirectVulnerableDependencies(auditResult, dirPath);
      const summary = await enhanceVulnerabilityList(
        auditResultWithParentDeps,
        dirPath
      );

      results[dirPath] = summary;
    } catch (error) {
      console.error("Error enhancing vulnerabilities:", error);
    }
  });

  // Wait for all package checks to complete.
  await Promise.all(promises);

  // Once all promises are resolved, log the results.
  console.log(JSON.stringify(results, null, 2));
})();
