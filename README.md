# delice

delice is a CLI intended to help you gain insight into your dependencies licenses.

## Usage

Via npx:
```bash
npx delice
```

Via global install:
```bash
npm install delice -g
delice
```

### Commands

Currently, there is only a default command:

```bash
delice [directory]
```

Running `delice` by itself will check the current working directory's `node_modules` directory. If you pass a directory, that directory's `node_modules` directory will be searched.

### Options

- `--version`: Boolean. Show version number
- `-h`, `--help`: Boolean. Show help
- `-j`, `--json` Boolean. Return JSON rather than a human-readable CLI output.

## Output

- License Expression
  - A license expression that occurred inside of `node_modules`
- Occurrences
  - Number of times a license was read from a `package.json` in the given directory
- Conformance
  - A set of data about license conformance
  - See the module, [conformance](https://www.npmjs.com/package/conformance), for more information.
- Packages
  - A list of all packages that fall under a license

## Reasoning

Currently, _most_ well-maintained tooling around licensing is pay-to-play. You need to pay to understand what you're consuming and how. The intent of delice (and liblice and conformance) is to help begin to surface more of this information in an open-source, accessible way.

delice is intended to be the CLI approach to this problem. Ideally, you can pop a delice configuration into your project and then fail if certain license conditions occur with the modules in your application. Additionally, being able to install a delice config as a dependency in your projects and validate via that path would be the end-game.

## Continued Development

Basically a roadmap.

### Coming soon

- `--ci` flag that will fail on bad licenses
- `.delicerc` / `package.json` property that will allow you to configure licenses and conditions that will pass/fail
- filter by license: `delice license mit`
- filter by package: `delice package mit`
- list of all licenses, no dependencies or other metadata
- use `spdx-correct` to validate license expressions that are *slightly* not correct (probably in `liblice`)
- features you'd like to see?

### Maybe in the future, if people want it

- differentiation of dependencies vs. devDependencies
- dry runs as a first-class (dependency resolution and check licenses without installing to disk)
- features you'd like to see?

### Probably in the future

- `npm install delice-${name}-config` to follow a specific configuration with zero effort
- features you'd like to see?

## Related Projects

Both [`liblice`](https://www.npmjs.com/package/liblice) and [`conformance`](https://www.npmjs.com/package/conformance) are modules that were originally part of the `delice` codebase, but were split out since they were valuable on their own and more maintainable if they were out of the CLI.

### What is liblice?

[liblice](https://www.npmjs.com/package/liblice) is the module that does the majority of the work to build out the data that delice surfaces to you. If you're looking to programatically get the kind of information you'd get from delice, check out liblice.

### What is conformance?

[conformance](https://www.npmjs.com/package/conformance) specifically looks at a license string and provides hopefully relevant metadata about that license from the perspective of SPDX and the intersection SPDX and the Open Source Initiative and the Free Software Foundation. Currently, it's strictly limited to SPDX information, but could be expanded in the future should there be interest.
