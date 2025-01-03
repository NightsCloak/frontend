| Branch     | Build Status                                                                                                                                                                                                                                      |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Develop    | [![.github/workflows/fh_azure_cicd_develop.yml](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_develop.yml/badge.svg?branch=develop)](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_develop.yml) |
| Staging    | [![.github/workflows/fh_azure_cicd_staging.yml](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_staging.yml/badge.svg?branch=beta)](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_staging.yml)    |
| Production | [![.github/workflows/fh_azure_cicd_prod.yml](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_prod.yml/badge.svg)](https://github.com/IntractInc/frontend/actions/workflows/fh_azure_cicd_prod.yml)                         |

# Intract Frontend

### Quickstart:

clone the repo

`git clone git@github.com:IntractInc/frontend.git`

run `yarn` to install dependencies

`yarn start` to launch the development server locally

##ENV Setup
The repo is setup to automatically point to our current development api.

Node Version: 18

if yarn is not installed run

```
corepack enable yarn
yarn set version 3.2.3
```

if you need to override the ENV you can create a .env.local file which will take precedence over the included
.env.development
