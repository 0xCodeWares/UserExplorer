# Welcome to User Explorer!

## An app made to browse a list of users and see posts made by them

The app currently makes use of:

- React Native
- React Navigation
- MobX State Tree
- TypeScript

## Quick Start

The User Explorer project's structure bootstrapped with Ignite boilerplate  will look similar to this:

```
UserExplorer
├── app
│   ├── components
│   ├── config
│   ├── devtools
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│       ├── api
│   ├── theme
│   ├── utils
│   └── app.tsx
├── assets
│   ├── icons
│   └── images
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   └── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
Contains default reusable components of the ignite boilerplate.

**i18n**
Contains default translations of the ignite boilerplate using `react-native-i18n`.

**models**
Contains User and Posts model, UserPostsStore and UserStore, RootStore. 
1. User model contains props for `mobx-state-tree` to read basic user data like id, firstName, lastName, age, email etc.
2. Posts model contains props for `mobx-state-tree` to read basic details of post by a user like id, title, body, views etc.
3. The UserStore contains   - fetchUsers() function for fetching the UserDetails from the Api getUserList() and store in the UserStore using `mobx-state-tree`
                            - A getter function usersList() returns the userdetails from the store
4. The UserPostsStore contains - fetchUserPosts(userId) : which has userId param for fetching Posts of that specific userId from getUserPosts() and store it in UserPostsStore
                               - A getter function postsList() returns the posts from the store

**navigators**
We use `react-navigation` navigators for navigation. The main navigator is a stack navigator(AppStack) with two screens 1. UserListScreen with name UserList and 2. PostScreen with name Post. 

**screens**
Contains the two screens icluded in AppStack. 
1. UserListScreen - 1.Contains a flatlist for optimized infinite scrolling with renderItem being the default card component of ignite boilerplate code
                    2.UserListed is fetched into UserStore inside UseEffect with UserStore as dependency.
                    3.Contains two functions 1.loadNextPage - increments currentPage by one until maxPage for pagination 
                                             2.loadPreviousPage - decrements   currentPage by one before 0.
                    4.readPaginatedData function splices the total list to only pageSize number of items based on currentPage.
                    5.handlePressCard - for navigating to PostListScreen with userId as route parameter.
3. PostScreen     - 1. Above Pagination techniques are reused in for optimized viewing of posts list

**services**
The default Api class provided with ignite boilerplate is used. The default libraries apisauce and axios is used to fetch data. 
Two async functions are declared 1.getUserList() - Fetches userList from the given api
                                 2.getUserPosts() -  Fetches Posts with the userId recieved as parameter

**theme**
Theme for the application, including spacing, colors, and typography.

**utils**
miscellaneous helpers and utilities

**app.tsx** Entry point to the app

### ./assets directory

This directory contains various assets. The assets are further categorized into subdirectories, including `icons` and `images`:

```
assets
├── icons
└── images
```

**icons**
Various icons and their paths are declared here.

**images**
Background images, logos, or any other graphics.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

