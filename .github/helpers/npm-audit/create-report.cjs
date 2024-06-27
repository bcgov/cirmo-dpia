const path = require('path');
const vulnerabilities = require(path.resolve(__dirname, `../../../vulnerabilities.json`));

const LOCAL_TEST = false;
const TEST_DIR_PATHS = ['.'];

/**
 * THIS FILE DOES NOT REQUIRE ANY EDITING.
 * Place within .github/helpers/npm-audit/
 *
 * To test this file locally,
 * - Generate output from parse-npm-deps.js
 * - Set LOCAL_TEST variable to true.
 * - Edit TEST_DIR_PATHS if necessary.
 * - From root, run "node .github/helpers/npm-audit/create-report.cjs > outputText.json"
 * - Check the outputText.json file, then delete it.
 */

// Get directory paths from env.
const directoryPaths = LOCAL_TEST ? TEST_DIR_PATHS : JSON.parse(process.env.directoryPaths);

// Save results to json.
let results = {};

// Emojis.
const check = '✔️';
const attention = '⚠️';

// Badge color codes (checked for WCAG standards).
const red = '701807'; // Red background, White text.
const orange = '9e3302'; // Orange background, White text.
const yellow = 'f5c60c'; // Yellow background, Black text.
const blue = '0859A1'; // Blue background, White text.

// GitHub Markdown Formatting.
const heading = (text, size) => `${'#'.repeat(size)} ${text}\n`;
const lineBreak = () => `\n<br />\n\n`;
const line = (text) => `${text}\n`;
const link = (text, url) => `[${text}](${url}) \n`;

// Formatted date.
const getFormattedDate = () => {
  const date = new Date();

  // Get day of the month.
  const day = date.getDate();

  // Determine the ordinal suffix.
  const ordinal = (day) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return day + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // Formatter for the rest of the date.
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the date and replace the day number with ordinal.
  return formatter.format(date).replace(/\d+/, ordinal(day));
};

// Messages.
const title = `NPM Vulnerability Report - ${getFormattedDate()}`;
const subTitle = 'NPM packages have been checked for vulnerabilities using npm audit.';
const noVulnerabilities = `${check} - No vulnerabilities detected.`;
const noFixAvailable = `This dependency does \`NOT\` have a \`fix available.\``;
const fixAvailableIndirect = (vuln) =>
  `This dependency has a \`fix available\`, but \`${vuln}\` is \`NOT\` a \`direct dependency\` in your package.json. \nSee affected dependencies below:`;
const fixAvailableDirect = `This dependency has a \`fix available\`, and is a \`direct dependency\` in your package.json. \nSee affected dependencies below:`;

// Output vulnerabilities and possible fixes.
const outputVulnerabilities = (vulnerabilitiesArray, dirPath) => {
  vulnerabilitiesArray.forEach((vuln) => {
    const {
      name,
      severity,
      title,
      cvss,
      range,
      cwe,
      url,
      isDirect,
      fixAvailable,
      latestVersion,
      parentDependencies,
    } = vuln;

    const badgeColor =
      severity === 'critical'
        ? red
        : severity === 'high'
          ? orange
          : severity === 'moderate'
            ? yellow
            : blue;

    // Output vulnerable dep.
    results[dirPath] += `${lineBreak()}\n`;
    results[dirPath] += `${line(`![${name}_header]`)}\n\n`;

    // Output summary.
    results[dirPath] += `${line(`${title}.`)}`;

    // Output details.
    results[dirPath] += `\n${line(`**Severity**: \`${severity}\``)}`;
    results[dirPath] += `${line(`**CVSS Score**: \`${cvss} / 10\``)}`;
    results[dirPath] += `${line(`**Vulnerable Range**: \`${range}\``)}`;
    results[dirPath] += `${line(`**Weaknesses**: \`${cwe}\``)}`;

    // Output advisory link.
    results[dirPath] += `\n${link('GitHub Advisory', url)}`;

    // Output latest version.
    results[dirPath] += `\n${line(`**Latest Available Version**: \`${latestVersion}\``)}`;

    // Output fix message.
    if (!fixAvailable) results[dirPath] += `\n${line(noFixAvailable)}`;

    if (fixAvailable && isDirect) {
      results[dirPath] += `\n${line(fixAvailableDirect)}`;
      results[dirPath] += `\n${line(`Update \`${name}\` to \`${latestVersion}\`.`)}`;
    }

    if (fixAvailable && !isDirect) {
      results[dirPath] += `\n${line(fixAvailableIndirect(name))}`;

      // Output start of spoiler.
      results[dirPath] += `${line(`<details>`)}\n`;
      results[dirPath] += `${line(`<summary>`)}`;
      results[dirPath] +=
        `${line(`Expand to see direct dependencies affacted by this vulnerability. <br /><br />\n`)}`;

      // Output end of spoiler summary.
      results[dirPath] += `${line(`</summary>\n`)}`;

      // Output possible fixes:
      parentDependencies.forEach((parent) => {
        parent.directDependencies.forEach((directDep) => {
          const { name, possibleFixAvailable, latestVersion, currentVersion } = directDep;

          if (!possibleFixAvailable)
            results[dirPath] +=
              `${line(`- Direct dependency \`${name}\` does NOT have a fix available.\n\n`)}`;

          if (possibleFixAvailable) {
            results[dirPath] +=
              `${line(`- Direct dependency \`${name}\` may have a fix available because one of it's nested child dependencies fixes the vulnerability and there is a new version of \`${name}\` available.`)}`;
            results[dirPath] +=
              `${line(`Update from version \`${currentVersion}\` to \`${latestVersion}\`.\n\n`)}`;
          }
        });
      });

      // Output end of spoiler.
      results[dirPath] += `${line(`</details>\n`)}`;
    }

    // Add Header text
    results[dirPath] += `\n${line(
      `[${name}_header]: https://img.shields.io/badge/${name}-${badgeColor}?style=for-the-badge \n`,
    )}`;
  });
};

// Escape special characters for GitHub Actions.
const escapeForGitHubActions = (str) =>
  str.replace(/%/g, '%25').replace(/\n/g, '%0A').replace(/\r/g, '%0D');

(async () => {
  // Create an array of promises for each dirPath.
  const promises = directoryPaths.map(async (dirPath) => {
    results[dirPath] = '';

    // Read the vulnerabilities file.
    const vulnerabilitiesArray = vulnerabilities[dirPath].vulnerabilities ?? [];
    const metadata = vulnerabilities[dirPath].metadata ?? { vulnerabilities: 0 };
    const { info, low, moderate, high, critical, total, vulnerabilities } = metadata.vulnerabilities;

    // Output title.
    results[dirPath] += `${heading(title, 2)}`;
    results[dirPath] += `${line(subTitle)}\n`;

    // Get highest severity of vulnerability.
    const highestSeverity = metadata.highestSeverity;

    let highestSeverityColor = blue; // Low or Info
    if (highestSeverity === 'critical')
      highestSeverityColor = red; // Critical
    else if (highestSeverity === 'high')
      highestSeverityColor = orange; // High
    else if (highestSeverity === 'moderate') highestSeverityColor = yellow; // Moderate

    // Output summary.
    if (total ? total === 0 : metadata.vulnerabilities === 0) {
      results[dirPath] += `${line(noVulnerabilities)}`;
    } else {
      // Output highest severity.
      results[dirPath] += `${line('![HIGHEST_SEVERITY]\n')}`;
      results[dirPath] += `${line(
        `\n[HIGHEST_SEVERITY]: https://img.shields.io/badge/highest_severity-${highestSeverity}-${highestSeverityColor}?style=for-the-badge \n\n`,
      )}`;

      if (info !== 0)
        results[dirPath] += `${line(`${attention} - ${info} Info severity vulnerabilities`)}`;

      if (low !== 0)
        results[dirPath] += `${line(`${attention} - ${low} Low severity vulnerabilities`)}`;

      if (moderate !== 0)
        results[dirPath] +=
          `${line(`${attention} - ${moderate} Moderate severity vulnerabilities`)}`;

      if (high !== 0)
        results[dirPath] += `${line(`${attention} - ${high} High severity vulnerabilities`)}`;

      if (critical !== 0)
        results[dirPath] +=
          `${line(`${attention} - ${critical} Critical severity vulnerabilities`)}`;

      // Output vulnerabilities and possible fixes.
      outputVulnerabilities(vulnerabilitiesArray, dirPath);
    }

    results[dirPath] = escapeForGitHubActions(results[dirPath]);
  });

  // Wait for all outputs to complete.
  await Promise.all(promises);

  // Once all promises are resolved, log the results.
  console.log(JSON.stringify(results, null, 2));
})();
