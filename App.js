import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import logo from "./assets/ImageShare.jpg";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 3000);

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  let openShareDialogAsync = async () => {
    if (Platform.OS === "web") {
      alert("Uh-oh, sharing is not available on your platform");
      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(
      selectedImage.localUri
    );
    await Sharing.shareAsync(imageTmp.uri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText2}>Share this photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeImage} style={styles.cancelButton}>
          <Text style={styles.buttonText2}>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from you phone with a friend, just press the button
        below.
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      {/* <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={{ width: 305, height: 159 }}
      /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 15,
    paddingLeft: 20,
    width: 130,
    height: 50,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 15,
    paddingLeft: 20,
    width: 130,
    height: 50,
    textAlign: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  buttonText2: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "stretch",
    marginBottom: 15,
  },
});
