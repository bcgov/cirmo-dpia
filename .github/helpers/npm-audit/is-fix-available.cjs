const semver = require('semver');

/**
 * Determines if a fix is available in a parent package for a vulnerable child dependency.
 * @param {string} latestVersion - The latest version of the vulnerable dependency.
 * @param {string} vulnerableRange - The range of versions that are considered vulnerable.
 * @param {string} childDepVersion - The version of the vulnerable package as a child dependency of a parent dependency.
 * @returns {boolean} - Returns true if the version of the child dependency has fixed the vulnerability by using a version that is outside the vulnerable range; otherwise, returns false.
 */
const isFixAvailable = (latestVersion, vulnerableRange, childDepVersion) => {
  // Check if the latest version is within the vulnerable range
  if (semver.satisfies(latestVersion, vulnerableRange)) {
    return false;
  }

  // Check if the child dependency version is outside the vulnerable range
  const resolvedVersion = semver.maxSatisfying(
    [latestVersion, childDepVersion.replace(/^[^\d]*/, '')],
    childDepVersion,
  );

  return !semver.satisfies(resolvedVersion, vulnerableRange);
};

module.exports = isFixAvailable;
