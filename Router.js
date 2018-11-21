import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";

import {Movies} from "./modules/movies";
import {Comments} from "./modules/comments";

const MainNavigator = createStackNavigator(
    {
        Movies: {
            screen: Movies
        },
        Comments: {
            screen: Comments
        }
    },
    {
        initialRouteName: "Movies",
        headerMode: 'none'
    }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
