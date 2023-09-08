## Locally running the E2E Tests

To run all the tests specified in your WDIO configuration, you can use the following command:

```bash
npm run wdio
```

## Running a Single Feature File

To run a single feature file, follow these steps:

1. Identify the feature file you want to run, located in the ./test/features/featurefiles/e2e/ directory.

2. Use the following command, replacing your-feature-file.feature with the name of the specific feature file you want to run:

```bash
npm run wdio -- --spec ./test/features/featurefiles/e2e/your-feature-file.feature
```
