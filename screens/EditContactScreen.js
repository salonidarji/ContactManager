import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
  ScrollView
} from "react-native";
import { Form, Item, Input, Label, Button } from "native-base";

export default class EditContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    };
  }

  static navigationOptions = {
    title: "Edit Contact"
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");

      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactjsonstring => {
        var contact = JSON.parse(contactjsonstring);
        contact["key"] = key;
        this.setState(contact);
        console.log("contact: " + JSON.stringify(contact));
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateContact = async key => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Alert.alert("Fill the fields");
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <ScrollView style={styles.container}>
          <Form>
            <Item>
              <Label style={styles.inputItem}>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={fname =>
                  this.setState({
                    fname
                  })
                }
              >
                {this.state.fname}
              </Input>
            </Item>
            <Item>
              <Label style={styles.inputItem}>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={lname =>
                  this.setState({
                    lname
                  })
                }
              >
                {this.state.lname}
              </Input>
            </Item>
            <Item>
              <Label style={styles.inputItem}>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={email =>
                  this.setState({
                    email
                  })
                }
              >
                {this.state.email}
              </Input>
            </Item>
            <Item>
              <Label style={styles.inputItem}>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                onChangeText={phone =>
                  this.setState({
                    phone
                  })
                }
              >
                {this.state.phone}
              </Input>
            </Item>

            <Item>
              <Label style={styles.inputItem}>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={address =>
                  this.setState({
                    address
                  })
                }
              >
                {this.state.address}
              </Input>
            </Item>
          </Form>
          <Button
            style={styles.button}
            rounded
            full
            onPress={() => {
              this.updateContact(this.state.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
          <View style={styles.empty} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#45CE30",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
