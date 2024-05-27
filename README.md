## Dev notes

### How to update OSS License

- It uses https://www.npmjs.com/package/license-checker
- Generate a json file for the list of OSS license by running the following command.

```
$ license-checker --production  --json --out ./licenses.json
```
