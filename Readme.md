# How to run the code

This project is only optimised for Android as of now.
- Take a pull from repo
- Do `yarn install` from a terminal running inside project folder
- Use `react-native start` to run the packager
- Run the app on simulator or device using `react-native run-android`

# Architecture

- This app uses redux and rxjs for managing app state and async tasks respectively
- App is split into two modules - `movies` and `comments`
- Navigation is handled by `react-native-navigation`
- Each module has it's own reducer which is then glued together by `combineReducers` 
- Firebase data flow is handled through `rxjs` using `epics`
- State persist library used here is `redux-persist`. Although it's not required in this use case, I opted to use it for future upgrades.

# Future upgrades

- Improve UI/UX
- Add/edit/delete movies
- Edit/delete comment
- Reply to a comment
- Rate movies
- Handle movies using firebase
- Search for movies
- User sign in and sign up
