# Duncle

## Local ENV setup

### `.env` file

Populate your app with these variables with an .env file at the root.

```
REACT_APP_DATABASE_URL=
REACT_APP_DATABASE_USERNAME=
REACT_APP_DATABASE_PASSWORD=

REACT_APP_SALT=
REACT_APP_ENCRYPTION_PASSWORD=

# Only needed since there's a babel-loader mismatch between CRA and storybook
# https://github.com/facebook/create-react-app/issues/10123
SKIP_PREFLIGHT_CHECK=true
```

## Available Scripts

In the project directory, you can run:

### `npm start`

#### NOTE: this is used to start up a node.js server, which Heroku uses to serve up static build files

### `npm start:dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

### `npm run storybook`

It's possible you'll need to configure these variables in your `.rc` file

```
# for storybook
# export NODE_ENV=development
# export BABEL_ENV=$NODE_ENV
echo NOTE: hard coding development for both the NODE_ENV and BABEL_ENV.. see https://github.com/facebook/create-react-app/issues/2377
## Learn More
```

This project, like literally every single other ReactJS app, was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Useful GCloud commands

### gcloud config unset project

Resets configuration for the current project. This is useful if you need to switch accounts

### gcloud init

Initializes all configuration to deploy the app to the cloud

### gcloud app deploy

deploys the app to the specified environment

## Install certs on AWS instance

1. Sudo `sudo su`
2. Set these env variables

```
DOMAIN=api.sergionajera.com
WILDCARD=*.$DOMAIN
```

3. Run certbot command `sudo certbot -d $DOMAIN -d $WILDCARD --manual --preferred-challenges dns certonly`

Idea to automate: set up a scheduled job to run `certbot renew` every other month
