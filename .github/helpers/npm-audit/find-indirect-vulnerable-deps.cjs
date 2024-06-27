const fs = require('fs');
const path = require('path');

// Runs runNpmAudit and adds parent dependencies if they can be found in the package-lock.json
const findIndirectVulnerableDependencies = async (auditResult, directoryPath) => {
  try {
    const { vulnerabilities } = auditResult;

    if (vulnerabilities.length === 0) {
      // No vulnerabilities found
      return { ...auditResult, parentDependencies: {} };
    }

    const packageLockPath = path.join(process.cwd(), path.resolve(__dirname, `../../../${directoryPath}/package-lock.json`));
    if (!fs.existsSync(packageLockPath)) {
      throw new Error('package-lock.json not found in the current directory.');
    }

    const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf-8'));
    const vulnerableDeps = vulnerabilities
      .filter((vuln) => !vuln.isDirect)
      .map((vuln) => vuln.name);

    const parentDependencies = {};

    const cleanDependencyName = (name) => name.replace(/^node_modules\//, '');

    const findVulnerableChildren = (dependencies, parentChain = []) => {
      if (!dependencies) return;

      for (const [depName, depData] of Object.entries(dependencies)) {
        const cleanDepName = cleanDependencyName(depName);

        if (vulnerableDeps.includes(cleanDepName)) {
          if (!parentDependencies[cleanDepName]) {
            parentDependencies[cleanDepName] = [];
          }
          parentDependencies[cleanDepName].push(...parentChain.map(cleanDependencyName));
        }

        if (depData.dependencies) {
          findVulnerableChildren(depData.dependencies, [...parentChain, cleanDepName]);
        }
      }
    };

    const explorePackageLock = (node, parentChain = []) => {
      if (node.dependencies) {
        findVulnerableChildren(node.dependencies, parentChain);
      }
      if (node.packages) {
        findVulnerableChildren(node.packages, parentChain);
      }
    };

    explorePackageLock(packageLock);

    const updatedVulnerabilities = vulnerabilities.map((vuln) => {
      return {
        ...vuln,
        parentDependencies: parentDependencies[vuln.name] || [],
      };
    });

    return {
      ...auditResult,
      vulnerabilities: updatedVulnerabilities,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = findIndirectVulnerableDependencies;
