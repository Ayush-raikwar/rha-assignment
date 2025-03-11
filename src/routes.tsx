import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { ProfileScreen } from "./screens/ProfileScreen"
import { HomeScreen } from "./screens/HomeScreen"
import { SavedPosts } from "./screens/SavedPosts"
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { StatusBar, View } from "react-native"
import { PostDetailsScreen } from "./screens/PostDetails"

export const Routes = () => {
    const Tab = createBottomTabNavigator()
    const Stack = createStackNavigator()

    const HomeStack = () => (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    )
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <NavigationContainer >
                <Tab.Navigator screenOptions={{animation:'shift'}}>
                    <Tab.Screen
                        name="Home" component={HomeStack}
                        options={{
                            tabBarIcon: ({ focused }) => <>
                                {focused &&
                                    <View style={{ width: '100%', height: 3.5, backgroundColor: 'rgba(135, 206, 235,.6)', marginBottom: 'auto', borderRadius: 8 }} />
                                }
                                <AntDesign name='home' color={'skyblue'} size={20} />
                            </>,
                            tabBarShowLabel: false
                        }}

                    />
                    <Tab.Screen
                        name="SavedPosts"
                        component={SavedPosts}
                        options={{
                            tabBarIcon: ({ focused }) => <>
                                {focused &&
                                    <View style={{ width: '100%', height: 3.5, backgroundColor: 'rgba(135, 206, 235,.6)', marginBottom: 'auto', borderRadius: 8 }} />
                                }
                                <MaterialIcons name='bookmarks' color={'skyblue'} size={20} />
                            </>,
                            tabBarShowLabel: false
                        }}
                    />
                    <Tab.Screen name="PostDetails" component={PostDetailsScreen}
                        options={{
                            tabBarIcon: ({ focused }) => <>
                                {focused &&
                                    <View style={{ width: '100%', height: 3.5, backgroundColor: 'rgba(135, 206, 235,.6)', marginBottom: 'auto', borderRadius: 8 }} />
                                }
                                <EvilIcons name='user' color={'skyblue'} size={26} />
                            </>,
                            tabBarShowLabel: false
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}