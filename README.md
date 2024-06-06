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

### Build an APK on the local machine

```
$ eas build --profile emulator --platform android --local
```

- "emulator" is a profile defined in eas.json.

### Guide to submit Android app

- https://github.com/expo/fyi/blob/main/creating-google-service-account.md

* Note: In the first time, we have to upload a binary to Google play console manually. [This](https://docs.expo.dev/submit/android/#manually-uploading-your-app-for-the-first-time) is the guide for it.

## Issues

### Notification icon on Android wasn't shown properly

- Icon config noted in https://docs.expo.dev/versions/latest/sdk/notifications/#configurable-properties didn't work.
- According to https://github.com/expo/expo/issues/24844#issuecomment-2105382069, they told to update AndroidManifest.xml manually until the issue is fixed.
- Step to edit AndroidManifest.xml is
  - 1. Run `$ npx expo prebuild -p android` to generate android directory
  - 2. Add below in `<application>...</application>` tag.

```
<meta-data android:name="expo.modules.notifications.default_notification_color" android:resource="@color/notification_icon_color"/>
<meta-data android:name="expo.modules.notifications.default_notification_icon" android:resource="@drawable/notification_icon"/>
```
