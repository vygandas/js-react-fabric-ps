# React and Fabric (poster maker app)


[![Cover](https://github.com/vygandas/js-react-fabric-ps/tree/master/src/assets/img/cover.png)]

This is example implementation of Fabric library into a React project. TypeScript used.

DEMO https://ecstatic-boyd-fa9268.netlify.com/

## Installation
1. `npm install`

## Usage
**Development**

`npm run start-dev`

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8080` 

**Production**

`npm run start-prod`

* Build app once (HMR disabled)
* App served @ `http://localhost:3000`

---

**All commands**

Command | Description
--- | ---
`npm run start-dev` | Build app continously (HMR enabled) and serve @ `http://localhost:8080`
`npm run start-prod` | Build app once (HMR disabled) and serve @ `http://localhost:3000`
`npm run build` | Build app to `/dist/` 
`npm run test:watch` | Run tests and watch
`npm run lint` | Run Typescript and SASS linter
`npm run lint:ts` | Run Typescript linter
`npm run lint:sass` | Run SASS linter
`npm run start` | (alias of `npm run start-dev`)
`npm run deploy` | Run tests and then build

