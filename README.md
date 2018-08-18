[![GitHub issues](https://img.shields.io/github/issues/ASCIIcat/MMM-CAP1188.svg)](https://github.com/ASCIIcat/MMM-CAP1188/issues) ![Status](https://img.shields.io/badge/status-Semi--Working-green.svg) ![Version](https://img.shields.io/badge/version-0.0.1-blue.svg) ![Ported with coffee](https://img.shields.io/badge/Ported%20with-a%20lot%20of%20%E2%98%95-lightgrey.svg)




# Magic Mirror Module: CAP1188

This a module for [Magic Mirror²](https://github.com/MichMich/MagicMirror) to act based on touch (capacitive) buttons via the [CAP1188](https://www.adafruit.com/products/1602) touch-button controller.
It is capable of connecting up to 8 buttons, which can be individually configured.
This module is forked from the module for the MPR121 [MMM-MPR121](https://github.com/PatriceG/MMM-MPR121) which is based on the awesome [MMM-Buttons module](https://github.com/Jopyth/MMM-Buttons)

This module sends out notifications to other modules.

For example this can be used to send notifications to the following modules:

- [Remote Control](https://forum.magicmirror.builders/topic/735/remote-control-shutdown-configure-and-update-your-magicmirror)
- [Profile Switcher](https://forum.magicmirror.builders/topic/1402/mmm-profileswitcher-a-profile-user-layout-switching-module)

## Installation

Clone this repository in your `modules` folder, and install dependencies:
```bash
cd ~/MagicMirror/modules # adapt directory if you are using a different one
git clone https://github.com/ASCIIcat/MMM-CAP1188.git
cd MMM-CAP1188
npm install
```
**Note:** On some installations you may need to use this command instead:
```bash
npm install --unsafe-perm
```

## Configuration

Add the module to your modules array in your `config.js`.

Below is a simple example (needs [Remote Control](https://forum.magicmirror.builders/topic/735/remote-control-shutdown-configure-and-update-your-magicmirror) installed), with two touch-buttons (electrodes) conneted, on inputs 0 and 1 of the CAP1188.
One switches on the display on a short touch, and switches it off on a long touch.
The other does not do anything on a short touch, but shuts down the system after keeping it touched for 3 seconds with an explanatory user alert.
```
{
    module: 'MMM-CAP1188',
    config: {
        buttons: [
            {
                pin: 0,
                name: "monitor_control",
                longPress: {
                    notification: "REMOTE_ACTION",
                    payload: {action: "MONITOROFF"}
                },
                shortPress: {
                    notification: "REMOTE_ACTION",
                    payload: {action: "MONITORON"}
                }
            },
            {
                pin: 1,
                name: "power",
                longPress: {
                    title: "Power off",
                    message: "Keep pressed for 3 seconds to shut down",
                    imageFA: "power-off",
                    notification: "REMOTE_ACTION",
                    payload: {action: "SHUTDOWN"}
                },
                shortPress: undefined
            }
        ]
    }
},
```
### Module Configuration

Here is full documentation of options for the modules configuration:

| Option        | Description   |
| ------------- | ------------- |
| `buttons` | An array of button configurations. See [Button Configuration](README.md#Button-Configuration) below. Default is `[]` (no buttons registered). |
| `minShortPressTime` | Minimum duration to trigger a short press in `ms`. Default is `0`. |
| `maxShortPressTime` | Maximum duration to trigger a short press in `ms`. Default is `500`. |
| `minLongPressTime` | Minimum time needed to trigger a long press in `ms`. Default is `3000`. Any press duration between `maxShortPressTime` and `minLongPressTime` does not do anything. |

### Button Configuration

Each button configuration is an object with the following properties:

| Property      | Description   |
| ------------- | ------------- |
| `pin` | Input pin number of the button input on the MPR121 (0 to 11)
| `name` | Name of the button for easier identification and log output. |
| `longPress` | Choose what notification to send on a long press. See [Notification Configuration](README.md#Notification-Configuration) below. Use `undefined` if nothing should trigger. |
| `shortPress` | Choose what notification to send on a short press. See [Notification Configuration](README.md#Notification-Configuration) below. Use `undefined` if nothing should trigger. |

### Notification Configuration

Each notification configuration is an object with the following properties:

| Property      | Description   |
| ------------- | ------------- |
| `notification` | Notification name. |
| `payload` | Notification payload. Can be anything, for example a `string` or an `object`. |
| `title`, `message`, and `imageFA` | *Optional (only for long press notifications):* If you want to display a message before executing set its options here. See [Alert documentation](https://github.com/MichMich/MagicMirror/tree/master/modules/default/alert#alert-params) for their meaning. |
