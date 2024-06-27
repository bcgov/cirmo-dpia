/**
 * Get the latest information about a dependency's version and child dependencies.
 * @param {string} dependencyName - The dependency to search.
 * @returns {Promise<{ name: string, latestVersion: string, childDependencies: { [dependencyName: string]: string } }>}
 */
const getLatestDependencyInfo = async (dependencyName) => {
  try {
    const response = await fetch(`https://registry.npmjs.org/${dependencyName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${dependencyName}: ${response.statusText}`);
    }

    const data = await response.json();
    const latestVersion = data['dist-tags'].latest;
    const latestVersionInfo = data.versions[latestVersion];

    const childDependencies = latestVersionInfo.dependencies || {};

    return {
      name: dependencyName,
      latestVersion,
      childDependencies,
    };
  } catch (error) {
    console.error('Error fetching latest version info:', error);
    throw error;
  }
};

module.exports = getLatestDependencyInfo;
