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
- https://blog.daiki-portfolio.com/eas-build/#i-0

## Note to submit Android app

https://docs.expo.dev/submit/android/

### Build a binary on EAS

```
$ eas build --profile production --platform android
```

- Then, a build process is triggered on the EAS.
-

### Guide to submit Android app

- https://github.com/expo/fyi/blob/main/creating-google-service-account.md

* Note: In the first time, we have to upload a binary to Google play console manually. [This](https://docs.expo.dev/submit/android/#manually-uploading-your-app-for-the-first-time) is the guide for it.
