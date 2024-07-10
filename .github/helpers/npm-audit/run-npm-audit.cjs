const path = require("path");
const { execSync } = require("child_process");

const parseDetails = (auditData) => {
  if (!auditData.vulnerabilities) {
    return {
      vulnerabilities: [],
      metadata: { vulnerabilities: 0 },
      highestSeverity: "none",
    };
  }

  const vulnerabilities = Object.keys(auditData.vulnerabilities).map((key) => {
    const vuln = auditData.vulnerabilities[key];
    return {
      name: key,
      severity: vuln.severity,
      isDirect: vuln.isDirect,
      via: vuln.via.map((v) => {
        if (typeof v === "string") return v;
        return {
          title: v?.title,
          severity: v?.severity,
          range: v?.range,
          url: v?.url,
          cwe: v?.cwe,
          cvss: v?.cvss?.score,
        };
      }),
      range: vuln?.range,
      fixAvailable: vuln?.fixAvailable,
    };
  });

  const highestSeverity =
    vulnerabilities.length === 0
      ? null
      : vulnerabilities.reduce((max, vuln) => {
          const severities = ["low", "moderate", "high", "critical"];
          return severities.indexOf(vuln.severity) > severities.indexOf(max)
            ? vuln.severity
            : max;
        }, "low");

  return {
    vulnerabilities,
    metadata: {
      vulnerabilities: auditData.metadata.vulnerabilities,
      highestSeverity,
    },
  };
};

// Runs 'npm audit --json' command and returns a modified output.
const runNpmAudit = async (directoryPath) => {
  try {
    const stdout = execSync("npm audit --json", {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "ignore"],
      cwd: path.resolve(__dirname, `../../../${directoryPath}`),
    });

    const auditData = JSON.parse(stdout);
    return parseDetails(auditData);
  } catch (error) {
    if (error.stdout) {
      try {
        const auditData = JSON.parse(error.stdout);

        return parseDetails(auditData);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw parseError;
      }
    } else {
      console.error("Error running npm audit:", error);
      throw error;
    }
  }
};

module.exports = runNpmAudit;
