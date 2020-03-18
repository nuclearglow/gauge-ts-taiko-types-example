A small test project using

* gauge
* gauge-ts
* taiko

# Usage

    $ npm install -g @getgauge/cli
    $ npm i
    $ gauge run specs/

# Initial Setup

    $ npm install -g @getgauge/cli
    $ gauge init ts

Edit `package.json` and manually set `gauge-ts` version to 0.0.5, see this issue here: https://github.com/BugDiver/gauge-ts/issues/57

    $ npm i taiko // TODO: github branch with issue

Edit `tsconfig.json` and add 2 lines to compiler options:

```json
{
    "compilerOptions": {
        ...,
        /* add experimental taiko TypeScript Type Definition folder to the project */
        "typeRoots": ["node_modules/@types", "node_modules/taiko/types"],
        /* use taiko types in the project */
        "types": ["node", "taiko"]
    }
}
```