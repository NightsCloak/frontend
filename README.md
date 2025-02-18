| Branch     | Build Status                                                                                                                                                                                                |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Develop    | [![.github/workflows/cicd_develop.yml](https://github.com/NightsCloak/frontend2/actions/workflows/cicd_develop.yml/badge.svg)](https://github.com/NightsCloak/frontend2/actions/workflows/cicd_develop.yml) |
| Production | [![.github/workflows/cicd_prod.yml](https://github.com/NightsCloak/frontend2/actions/workflows/cicd_prod.yml/badge.svg)](https://github.com/NightsCloak/frontend2/actions/workflows/cicd_prod.yml)          |

# NightsCloak Frontend

### Quickstart:

clone the repo

`git clone git@github.com:nightscloak/frontend.git`

run `yarn` to install dependencies

`yarn start` to launch the development server locally

##ENV Setup
The repo is setup to automatically point to our current development api.

Node Version: 18

if yarn is not installed run

```
corepack enable yarn
yarn set version 4+
```

if you need to override the ENV you can create a .env.local file which will take precedence over the included
.env.development
