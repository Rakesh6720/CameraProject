import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {PermissionsAndroid, Platform} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const App = () => {
  const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifier[]>();

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
    .then(r => {
      console.log(r.edges);
      setPhotos(r.edges);
    })
    .catch((err) => {
       //Error Loading Images
       console.log(err);
    });
  };

  return (
    
      <View style={{marginVertical: 100}}>
        <Text>Check the Images:</Text>
        <Button title="Load Images" onPress={handleButtonPress} />
        <ScrollView>
        {photos?.map((p, i) => {
          return (
            <Image
              key={i}
              style={{
                width: 300,
                height: 100,
              }}
              source={{ uri: p.node.image.uri }}
            />
          );
        })}
      </ScrollView>
      </View>
    
  );
}

export default App;
