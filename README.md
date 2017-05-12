# RHMAP Test Driver
This is a test-runner written in nodeJS that generate heavy loads on a RHMAP Push instance by sending push notification requests. It attacks [an HTTP endpoint](https://github.com/josemigallas/rhmap-test-cloud-app) hosted in some RHMAP project that will internally send the necessary requests through the entire platform.

#### Stress test modes
Stress testing can be made not only using the fh-mbaas-api (`$fh.push`), in order to send the request through the entire RHMAP inner systems, but also using the AeroGear's public RestAPI so the requests go directly to UPS.

#### Concurrency
Concurrency can be added in two ways. By using the `-i` flag, it will instantiate more than one test-runner, which is like running the node app many times in different processes. By adding the `-s` flag, a group of aliases will be sent together and the cloud app will handle them simultaneously using [Async](https://www.npmjs.com/package/async).

#### Batch Mode
Recently a new endpint has been added to the UPS API, that allows to send a list of different messages, with different options, with a single request. In order to use this, the flag `-b` must be added.

#### Usage
Having [NPM and nodeJS installed](https://nodejs.org/), first download all dependencies:
```
$ npm install --production
```
Then start the test-runner by running `node index.js` and passing the necessary arguments. To see detailed usage instructions run `node index.js -h`:
```
Usage: node index.js [Required] [options]

Required:
  -e, --endPoint           The cloud app endpoint url
  -a, --appId              The ID of the target application
  -c, --csv                The path to the CSV path containing the alias in format 'variants;alias;tokenId'.
                           Incompatible with 'variants'.  
  -v, --variants           The list of variants that will receive the notifications, separated by spaces. 
                           Incompatible witn 'csv'.

Options:
  -d, --delay              The delay between each request                                           [default: 6500]
  -s, --chunkSize          The number of alias to be sent in separated chunks, incompatible 
                           with --batchMode option.                                                 [default: 0]
  -i, --instances          How many test runners will be instantiated simultaneously                [default: 1]
  -b, --batchMode          Whether or not the notifications will be sent using the 'batch'
                           feature. Incompatible with --chunkSize option.                           [default: false]
  -D, --direct             Wether the UPS Sender API will be use (true) or the fh.push SDK (false)  [boolean] [default: false]

  -h, --help               Show help

Examples:
  node app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -d 5000
  node app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -b -i 10
  node app/index.js -e http://example.com/backend -a asdf12134 -c ./devices.csv -s 100 -D
  node app/index.js -e http://example.com/backend -a asdf12134 -v variant1 variant2 variant3 -D

```
## Development
Having [NPM and nodeJS installed](https://nodejs.org/), first download all dependencies:
```
$ npm install
```

#### Code Style
Make sure the style guidelines are being followed by running the linter, [ESLint](http://eslint.org/):
```
$ node_modules/.bin/eslint app spec
```

#### Specs
Make sure all specs are met by simply running:
```
$ npm test
```
For each new feature, modification, bug, etc. it is expected to create as many specs as it is necessary.

Specs must be named like the JS class or file they are defining, with `.spec` right before the extension. For example if we were to write the specs for:
```
my-class.js
```
the spec file would be:
```
my-class.spec.js
```
