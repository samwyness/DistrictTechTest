# District Technologies

### React Native Technical Test

#### Objective:

To assist us in assessing your technical ability, please build a small React Native application with
the following features:

Using React Native and your choice of frameworks, build an application with tabbed navigation that
includes 2 tabs.

- The first tab should include scroll view that dynamically loads some form of geolocation data
  from a data source (for example, a list of restaurants).
  - Each item should have two buttons, view details and view on map.
  - The view details button should open a new window with some basic metadata about that item.
  - The view on map button should take the user to the second tab, and center the map on the pin for that item.
- The second tab should have a map view, using a map framework of your choice, that loads in the list of locations from the data source used in the first tab and displays them on the map.

  - Tapping on the pin should navigate to a new screen with metadata about that location.

- In the info window, you should be able to tap a star icon, which stars that location. This star should
  be displayed in the main list view.

Please deliver the source code for the application in a git repository, with a basic readme describing
the process to run it on a device.

## Development

**Tools:**
- [NodeJs](https://nodejs.org/en/download/) (Node 12 or newer)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional)

_**Note:** To setup your development environment, please follow the [react native guide](https://reactnative.dev/docs/environment-setup)_

### Installation

From the project root directory
- Install dependencies - `yarn`
- Install pods (iOS) - `cd ios && pod install`

### To run the app on a device or emulator

- Start Metro server (in project root directory) - `yarn start`
- For android devices - `yarn android`
- For iOS devices - `yarn ios`

For more information on running react native on a device/emulator, please see [react native docs](https://reactnative.dev/docs/running-on-device)

## NOTES

- A majority of my time was spent reading through the React Native and Android Studio documentation
- Instead of opting for an app scaffolded with Expo CLI, I chose to go with the React Native CLI
- I chose [NativeBase](https://nativebase.io/) as the UI Library for this app, native base provide a 
  simple API layer for react native components.
- For Maps and Places services, I installed the [react-native-maps](https://github.com/react-native-maps/react-native-maps) 
  package, along with [Google Maps Platform](https://developers.google.com/maps/documentation/) SDK's for Maps and Places
  - **TODO:** finish integration of Google services for iOS devices

**Project structure:** (/src folder)
- **/components** - UI components 
- **/config** - App configurations
- **/constants** - App constants
- **/contexts** - Contexts using the React createContext API
- **/hooks** - React Hooks used to separate logic from components 
- **/models** - Typescript models
- **/navigation** - Navigation specific components (Navigators, Tabs, etc.)
- **/screens** - App screens
- **/services** - Set of context-independent classes