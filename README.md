# District Technologies

### React Native Technical Test

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
