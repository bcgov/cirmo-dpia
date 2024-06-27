const enhanceVulnerabilityList = require('./enhance-vulnerability-list.cjs');
const findIndirectVulnerableDependencies = require('./find-indirect-vulnerable-deps.cjs');
const runNpmAudit = require('./run-npm-audit.cjs');

// Requires semver dependency to run.

const LOCAL_TEST = false;
const TEST_DIR_PATHS = ['.'];

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
const directoryPaths = LOCAL_TEST ? TEST_DIR_PATHS : JSON.parse(process.env.directoryPaths);

// Save results to json.
let results = {};

(async () => {
  // Create an array of promises for each dirPath.
  const promises = directoryPaths.map(async (dirPath) => {
    try {
      const auditResult = await runNpmAudit(dirPath);
      const auditResultWithParentDeps = await findIndirectVulnerableDependencies(
        auditResult,
        dirPath,
      );
      const summary = await enhanceVulnerabilityList(auditResultWithParentDeps, dirPath);

      results[dirPath] = summary;
    } catch (error) {
      console.error('Error enhancing vulnerabilities:', error);
    }
  });

  // Wait for all package checks to complete.
  await Promise.all(promises);

  // Once all promises are resolved, log the results.
  console.log(JSON.stringify(results, null, 2));
})();
