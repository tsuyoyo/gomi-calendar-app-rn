## Dev notes

### How to update OSS License

- It uses https://www.npmjs.com/package/license-checker
- Generate a json file for the list of OSS license by running the following command.

```
$ license-checker --production  --json --out ./licenses.json
```

### How to build the development binary

```
$ eas build -p android --profile development
```

### EAS tips

- https://note.com/rect_angle/n/n87aba214fab4

### Guide to submit Android app

- https://github.com/expo/fyi/blob/main/creating-google-service-account.md
