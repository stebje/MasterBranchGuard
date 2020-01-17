![](mbg_logo.png) 
# Intro

MasterBranchGuard is a GitHub App built with [Probot](https://github.com/probot/probot) that automatically protects the master branch when new repositories are created.

An issue is created within the repository with an @mention and details on the protections added.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need;
* An [organization](https://github.com/organizations/plan) that can be used to trigger events to the app
* [Node.js](https://nodejs.org/en/)

### Installing

**Option 1 (for dev/testing on local machine)**

1. For documentation on setting up a local environment please see [Probot docs](https://probot.github.io/docs/)

2. Run these commands in your favorite terminal
```sh
# Download or clone repo to local repository
git clone https://github.com/steffenba/MasterBranchGuard.git

# Navigate to local repository and install dependencies from terminal
npm install

# Run the bot
npm start
# or
npm run dev
```

**Option 2 (for direct install to organization)** 

(***Note***: *Not yet possible, pending deployment to [Probot featured apps](https://probot.github.io/apps/)*)

1. Go to the [app's page](https://probot.github.io/apps/) on Probot and follow the instructions

2. Follow the instructions and make sure you select the organization(s) that you want MasterBranchGuard added to

## Contributing

If you have suggestions for how MasterBranchGuard could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Authors

**Steffen Bjerkenås** - [steffenba](https://github.com/steffenba/)

## License

[ISC](LICENSE) © 2020 Steffen Bjerkenås <steffenbj@hotmail.com>

## Acknowledgments

Logo created via https://www.freelogodesign.org/

Probot [community](https://probot.github.io/community/)

## Future improvements

See [FUTURE_IMPROVEMENTS.md](FUTURE_IMPROVEMENTS.md)
