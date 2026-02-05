import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/calculator");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          source={require("@/assets/images/taxi.png")}
          style={styles.imglogo}
        />
        <Text
          style={[
            styles.appname,
            { fontSize: 36, fontFamily: "Kanit_700Bold", color: "#000000" },
          ]}
        >
          TAXI METER
        </Text>
        <Text
          style={[
            styles.appname,
            {
              fontSize: 12,
              marginBottom: 30,
              color: "#00700fff",
              fontFamily: "Kanit_600SemiBold",
            },
          ]}
        >
          THAI FARE CALCULATOR
        </Text>
        <ActivityIndicator size="large" color="#00700fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff46",
    width: "90%",
    padding: 20,
  },
  appname: {
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffc72c",
    alignItems: "center",
    justifyContent: "center",
  },

  imglogo: {
    width: 150,
    height: 150,
  },
});
