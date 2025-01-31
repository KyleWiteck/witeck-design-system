# Magnit Design Monorepo

This monorepo project, Magnit Design, includes:

- The design library
- A Vite design library testing environment
- Documentation

## Prerequisites

Before getting started, ensure that you have the following software installed on
your system:

- **Node.js** (version >= 18.17.0)
- **npm** (version >= 9.6.7)

### Using Volta

If you use [Volta](https://volta.sh/), managing Node.js and npm versions is
straightforward. Volta is a tool designed to handle Node.js versions and package
managers efficiently, allowing you to switch between versions easily without
manual configuration.

With Volta:

1. **Node.js and npm Versions**: Volta automatically handles the installation of
   the required versions of Node.js and npm. You don’t need to manually install
   or upgrade them.
2. **Version Management**: Volta ensures that you always use the correct version
   specified in your project's configuration. This eliminates version conflicts
   and simplifies development workflows.

3. **Installation**: If you don’t have Volta installed, you can get it from
   [Volta’s official website](https://volta.sh/). Follow their installation
   instructions to set it up on your system.

By using Volta, you ensure a consistent development environment that adheres to
the project's specified version requirements seamlessly.

(Note: If you use Volta, this should be automatic)

## Installation

To install the project and its dependencies, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project's root directory: `cd project-name`
3. Install the dependencies using your preferred package manager:
   ```bash
   npm install
   ```

## Development

### Building the Library Bundle

To build the library bundle, you can use the provided npm scripts. These scripts
utilize Rollup for bundling your library and handle the build process
efficiently.

#### Build the Library Bundle

To create a production-ready build of your library, use the following command:

```bash
npm run build-lib
```

This command will:

- Use Rollup to bundle your library according to the configuration specified in
  rollup.config.lib.js.
- Provide verbose output to show detailed information about the build process.
- Clean up any previous build artifacts in the lib/dist/apps directory using
  rimraf.

#### Watch for Changes

For a development setup where you want to continuously build the library as you
make changes, use the following command:

```bash
npm run build-lib:watch
```

This command will:

- Run Rollup in watch mode with the configuration from rollup.config.lib.js.
- Automatically rebuild the library whenever you make changes to the source
  files.

### Rollup Configuration

Ensure that your rollup.config.lib.js file is correctly set up for your
library's bundling needs. This configuration file controls how Rollup processes
and bundles your library, including handling of modules, plugins, and output
formats.

By using these npm scripts, you can streamline the build process and ensure that
your library is always up-to-date and correctly bundled.

### Testing the Library Components Locally

To test library components locally during development, follow these steps:

#### Step 1: Use the `dev:lib-test` Script

The `dev:lib-test` script is designed to link your library, set up the test
application, and run it. This script simplifies the process of testing your
components in a development environment.

- Run the following command to execute the `dev:lib-test` script:

  ```bash
  npm run dev:lib-test
  ```

  This command will:

  - Link your library globally.
  - Navigate to the /test-app directory.
  - Install the necessary dependencies for the test application.
  - Link the locally developed library to the test application.
  - Start the development server for the test application.

#### Step 2: Understanding the Test Application

The /test-app directory contains a React + TypeScript + Vite setup for testing
your components. Here’s a brief overview of the setup:

- React + TypeScript + Vite: The test application uses Vite as the build tool
  for its fast refresh capabilities and support for modern JavaScript features.
- This will be a "playground" for the testing the library functionality and for
  a "real" testing environment.

#### Step 3: Verify Changes

After running the script and starting the development server, you can view and
test your library components in the /test-app environment. If you make changes
to the library, the test application should automatically reflect these updates
once you build the new library updated with `npm run build-lib`.

Note: Ensure you have all required dependencies installed and that your
development environment is correctly set up to utilize the dev:lib-test script
effectively.

### Manual Docs deployment

The docs **Docusaurus** site can be deployed to github pages by running the
following command:

```sh
GIT_USER=github-username USE_SSH=true npm -w docs run deploy
```

## License

This project is **unlicensed**. You may use, copy, modify, or distribute this
project under any terms you choose.

## Contributing

Pay Intel holds the project. All contributions must adhere to the following
guidelines:

- All work must be approved by all product owners.
  - Kyle Witeck
  - Francisco Veracoechea
- Documentation is required for any additions or updates before approval.
- We will follow semantic standard versioning rules for updates. For more
  details on versioning, please refer to the
  [npm documentation on Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning).

### Adding New Docs

Hooks, Types, and Utilities are autogenerated. However, Component docs need to
be manually created or updated when components change.

For Component docs:

1. Place the documentation file in the same folder as the component under
   `lib/components`.
2. Reference the file in the `docs` project using an `.mdx` file like this:

```mdx
---
title: Stack
sidebar_position: 2
description: The Stack component arranges elements vertically or horizontally.
---

import Doc from '../../../../lib/src/components/Stack/docs.mdx';

<Doc />
```

## Contact

For any inquiries or to reach out to the maintainers, please use the following
contact details:

- Kyle Witeck - kyle.witeck@magnit.com
- Francisco Veracoechea - Francisco.Veracoechea@magnitglobal.com
- Reporting Manager: Muhammad Shoaib - muhammad.shoaib@magnitglobal.com

## Publish React Lib

### Step 1: Create a GitHub Personal Access Token

1. Go to your GitHub account settings.
2. Click on "Developer settings" from the left-hand sidebar.
3. Select "Personal access tokens" under "Developer settings."
4. Click on "Generate new token."
5. Provide a name for the token (e.g., "GitHub NPM Registry Token") and select
   the `write:packages` scope.
6. Click "Generate token" and copy the generated token to a safe location. You
   won't be able to see it again.

### Step 2: Set Environment Variables

- ZSH

  ```shell
  # Open your zsh shell.

  # Set the environment variables for the current session.
  export GITHUB_USERNAME=their_github_username
  export NPM_TOKEN_DESIGN=their_personal_access_token

  # To make these environment variables available for future sessions,
  # add the export commands to your ~/.zshrc file.
  nano ~/.zshrc
  # Add the following lines at the end of the file:
  # export GITHUB_USERNAME=their_github_username
  # export NPM_TOKEN_DESIGN=their_personal_access_token
  # Save the changes and exit the text editor.

  # Apply the changes in the current terminal session.
  source ~/.zshrc
  ```

- Bash

  ```shell
  # Open your bash shell.

  # Set the environment variables for the current session.
  export GITHUB_USERNAME=their_github_username
  export NPM_TOKEN_DESIGN=their_personal_access_token

  # To make these environment variables available for future sessions,
  # add the export commands to your ~/.bashrc file.
  nano ~/.bashrc
  # Add the following lines at the end of the file:
  # export GITHUB_USERNAME=their_github_username
  # export NPM_TOKEN_DESIGN=their_personal_access_token
  # Save the changes and exit the text editor.

  # Apply the changes in the current terminal session.
  source ~/.bashrc
  ```

### Step 3: Log into GitHub NPM registry

1. Open your terminal or command prompt in the project.

2. Run the following command to log in to the GitHub NPM registry:

```bash
npm login --registry=https://npm.pkg.github.com/
```

3. You will be prompted to enter your GitHub username and your Personal Access
   Token (PAT) as the password.

   - **GitHub username**: Enter your GitHub username.
   - **Password**: For the password, you need to use your Personal Access Token
     (PAT). Generate a PAT in your GitHub account with the `write:packages`
     scope.

4. After successfully entering your GitHub credentials and the Personal Access
   Token, you should see a message indicating that you are logged in to the
   GitHub NPM registry.

Once logged in, you can publish packages to the GitHub NPM registry using the
`npm publish` command, and you will have access to any packages published in
that registry. Note that users who want to install packages from the GitHub NPM
registry will also need to log in with their GitHub credentials or use a
`.npmrc` file with the appropriate authentication token.
