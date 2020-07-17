# DormDash CS 411 Project SU20

API definition at `API.md`

## Build Steps

- Rename file `RENAME_TO_secrets.json` >> `secrets.json` and fill in vars
- Install Node/npm (if not installed already)
```bash
npm i -g yarn
yarn install
```
- Start server: `yarn start`
- Test ping `curl -X GET "localhost:3000/dev/test"`

## File Structure

```bash
src/
  input-schemas/  # Define API input schemas
  middleware/  # Utilities for pre/post-processing
  routes/  # API route handler entrypoints
    handler.d.ts  # Type defs for routes

package.json  # NPM/Yarn config file
yarn-lock.json  # (read-only) dependency lock file

serverless.yml  # Cloud scripting file for the Serverless framework

tsconfig.json  # TypeScript compiler config
webpack.config.js  # JS/TS build file

.eslintrc.js  # Linting config
.prettierrc.js  # Formatting config
```

## Useful Commands

- `yarn start` starts the offline server
- `yarn commit` lint/add all files in repo/commit/push
- `yarn lint` run linter/formatter
