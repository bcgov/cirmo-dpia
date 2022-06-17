# Contributing

All Contributions to this repository start with a Jira Item associated with the work request.

## Pull Request Process

1. Clone this repository. Ensure you've followed documentation on adding a [ssh-key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to your Github Account through your local workstation
1. Follow documentation provided throughout this repository on how to build all application components locally
1. Pull main to your local workstation to make sure your copy of this branch is up-to-date
1. Create a branch following [Github flow](https://docs.github.com/en/get-started/quickstart/github-flow) guidelines. Naming convention example -> dpia-123-api-get-user (jira-task-#-brief-description)
1. Develop changes related to your Jira task number
1. Update relevant documentation with details of your changes (ie// environment variable changes etc.)
1. Push your branch up to this remote Github Repository
1. Create a Pull Request comparing your branch against the remote repository main branch. Use the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE) provided and fill out ALL relevant information regarding your changes
1. Assign all relevant team members to review your development changes.
1. If some changes are required, you will be notified in the PR, address any change requested and push to the same branch. Change notifications may come via team member or Github Action
1. When your development changes meet the requirements put in place to be merged into the main branch, click the MERGE button on the Pull Request.
1. CELEBRATE! Now get back to developing.

## Digital Privacy Impact Assessment Bug Reports!

- When a bug is detected in the application, a jira bug task must be opened. The following information should be included in your bug report:

        - Expected application behavior
        - Current application behavior
        - Steps you took to produce said bug
        - Your local environment (ie// browser, version)
        - Notable error messages produced (screenshot or copy-paste of stacktrace)

Assign a priority level to the bug and inform the development team through normal communication platforms.
