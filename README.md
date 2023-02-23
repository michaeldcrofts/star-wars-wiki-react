# Star Wars Wiki
## About

This Wiki uses the Star Wars API [swapi.dev](https://swapi.dev/). It was written to answer a technical test and uses the following tech stack:
+ React
+ TypeScript
+ Redux
+ Bootstrap

## Hosted

Follow this link to view a built, hosted version of this app.
+ [star-wars-wiki-react.vercel.app](https://star-wars-wiki-react.vercel.app/)
## Client specification

Written as a technical test, but with the following client spec:
### Overview

+ > Build a 'wiki' on characters, planets, and star ships using The Star Wars API ([https://swapi.dev/](https://swapi.dev/)) in a SPA with a favourites list feature.
+ > Use React with some state management library of your choice.
+ > The design and structure are completely up to you. Feel free to use a CSS framework too, the fancier you make it look the better, however, we don't expect it to be an award-winning design just something that considers your ideas on usability.
+ > Each character should have a 'Favourite' button which allows the user to save this character as a favourite. Displaying these favourites somehow and the ability to remove them again from the list (and the character page) should be implemented but is up to you on how and where this is displayed.
+ > Storing the data in memory (via some state management) or local storage is fine. It only needs to persist for the current session.

### Implementation

+ > The homepage should include a list of characters (the first page of characters in the '/people/' response from the API is sufficient).
+ > Each character should then have their profile page where you can see their bio and links to their home planet and star ships pages.
+ > Linked planets and star ships should also have a 'bio' page.
+ > You should be able to search for characters, planets, and star ships.
+ > Implement client-side caching (LRU) of requests so you are not making API calls you have previously made.
+ > Loading state should be taken into account.
+ > The data you choose to display on each screen is up to you.
+ > Handling errors with correct messages when/if the API call fails.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
