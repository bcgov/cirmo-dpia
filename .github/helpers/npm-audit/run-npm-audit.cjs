const { execSync } = require('child_process');
const path = require('path');

// Runs 'npm audit --json' command and returns a modified output.
const runNpmAudit = async (directoryPath) => {
  try {
    execSync('npm i', { cwd: path.resolve(__dirname, `../../../${directoryPath}`) });
    const stdout = execSync('npm audit --json', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
      cwd: path.resolve(__dirname, `../../../${directoryPath}`),
    });
    const auditData = JSON.parse(stdout);

    if (!auditData.vulnerabilities) {
      return { vulnerabilities: [], metadata: { vulnerabilities: 0 }, highestSeverity: 'none' };
    }

    const vulnerabilities = Object.keys(auditData.vulnerabilities).map((key) => {
      const vuln = auditData.vulnerabilities[key];
      return {
        name: key,
        severity: vuln.severity,
        isDirect: vuln.isDirect,
        via: vuln.via,
        range: vuln.range,
        fixAvailable: vuln.fixAvailable,
      };
    });

    const highestSeverity = vulnerabilities.reduce((max, vuln) => {
      const severities = ['low', 'moderate', 'high', 'critical'];
      return severities.indexOf(vuln.severity) > severities.indexOf(max) ? vuln.severity : max;
    }, 'low');

    return {
      vulnerabilities,
      metadata: {
        vulnerabilities: vulnerabilities.length,
      },
      highestSeverity,
    };
  } catch (error) {
    if (error.stdout) {
      try {
        const auditData = JSON.parse(error.stdout);

        if (!auditData.vulnerabilities) {
          return { vulnerabilities: [], metadata: { vulnerabilities: 0 }, highestSeverity: 'none' };
        }

        const vulnerabilities = Object.keys(auditData.vulnerabilities).map((key) => {
          const vuln = auditData.vulnerabilities[key];
          return {
            name: key,
            severity: vuln.severity,
            isDirect: vuln.isDirect,
            title: vuln.via[0].title,
            url: vuln.via[0].url,
            cwe: vuln.via[0].cwe,
            cvss: vuln.via[0].cvss.score,
            range: vuln.range,
            fixAvailable: vuln.fixAvailable,
          };
        });

        const highestSeverity = vulnerabilities.reduce((max, vuln) => {
          const severities = ['low', 'moderate', 'high', 'critical'];
          return severities.indexOf(vuln.severity) > severities.indexOf(max) ? vuln.severity : max;
        }, 'low');

        return {
          vulnerabilities,
          metadata: {
            vulnerabilities: auditData.metadata.vulnerabilities,
            highestSeverity,
          },
        };
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw parseError;
      }
    } else {
      console.error('Error running npm audit:', error);
      throw error;
    }
  }
};

module.exports = runNpmAudit;
