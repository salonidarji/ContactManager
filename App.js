import HomeScreen from "./screens/HomeScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";
import EditContactScreen from "./screens/EditContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";

import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Add: { screen: AddNewContactScreen },
    View: { screen: ViewContactScreen },
    Edit: { screen: EditContactScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#EEC213"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
