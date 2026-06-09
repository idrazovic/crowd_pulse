# Feed UI Phase 1 Spec

## Overview

This is phase 2 of the trending feed UI layout. Use the screenshot referenced below for how it should look.

## Requirements for phase 2

- Platfrom logo in the upper left hand side is clickable and leads to /feed
- Search icon opens a search bar in the top bar at the middle. search does not do anything at the moment. Search bar can be closed by clicking on the search icon and on X buton which should exist in the search bar itself. 
- Notifications icon opens a dropdown and contains list of dummy notifications. fetch dumy notfications from mock-data.ts. if there aren't no dummy notifications in the file, add them.
- clicking on the profile avatar opens a dropdown that has sign out button (which does not have anything at the moment) and a profile item that opens /user/{id-of-the-user} page which will be empty, and would have just a heading with the value of the CURRENT_USER.name
- vibe dropdown is clickable and opens a dropdown which has a list of all vibe tags from the mock-data.ts
- country  is clickable and opens a dropdown which has a list of all countries from the mock-data.ts
- clicking on the actuall lineup leads to and empty page /lineup/{id-of-the-lineup} that has only heading with the value of lineup title

## References

- @context/screenshots/trending-feed-web.png
- @context/screenshots/trending-feed-mobile.png
- @src/lib/mock-data.ts