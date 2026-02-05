import { Image } from "expo-image";
import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
export default function Bmi() {
  const [distance, setDistance] = useState("");
  const [trafficjamTime, setTrafficjamTime] = useState("");
  const [result, setresult] = useState("0.00");
  const [pricePerDistance, setPricePerDistance] = useState("0.00");
  const [pricePerTrafficJam, setPricePerTrafficJam] = useState("0.00");
  const handleCal = () => {
    Keyboard.dismiss();
    //validate input
    if (distance === "" || isNaN(Number(distance)) || Number(distance) < 0) {
      alert("โปรดป้อนระยะทางที่ถูกต้อง");
      return;
    }
    if (
      trafficjamTime === "" ||
      isNaN(Number(trafficjamTime)) ||
      Number(trafficjamTime) < 0
    ) {
      alert("โปรดป้อนเวลาที่รถติดที่ถูกต้อง");
      return;
    }
    let total = 0;
    let distanceNum = Number(distance);
    let trafficjamTimeNum = Number(trafficjamTime);
    let priceDistance = 0;
    let priceTrafficJam = 0;

    // ค่าเริ่มต้น 0-1 กม.
    priceDistance = 35;

    if (distanceNum > 1) {
      if (distanceNum <= 10) {
        priceDistance += (distanceNum - 1) * 6.5;
      } else if (distanceNum <= 20) {
        priceDistance += 9 * 6.5;
        priceDistance += (distanceNum - 10) * 7;
      } else if (distanceNum <= 40) {
        priceDistance += 9 * 6.5;
        priceDistance += 10 * 7;
        priceDistance += (distanceNum - 20) * 8;
      } else if (distanceNum <= 60) {
        priceDistance += 9 * 6.5;
        priceDistance += 10 * 7;
        priceDistance += 20 * 8;
        priceDistance += (distanceNum - 40) * 8.5;
      } else if (distanceNum <= 80) {
        priceDistance += 9 * 6.5;
        priceDistance += 10 * 7;
        priceDistance += 20 * 8;
        priceDistance += 20 * 8.5;
        priceDistance += (distanceNum - 60) * 9;
      } else {
        priceDistance += 9 * 6.5;
        priceDistance += 10 * 7;
        priceDistance += 20 * 8;
        priceDistance += 20 * 8.5;
        priceDistance += 20 * 9;
        priceDistance += (distanceNum - 80) * 10.5;
      }
    }

    // รถติด
    priceTrafficJam = trafficjamTimeNum * 3;

    // รวมทั้งหมด
    total = priceDistance + priceTrafficJam;

    setPricePerDistance(priceDistance.toFixed(2));
    setPricePerTrafficJam(priceTrafficJam.toFixed(2));
    setresult(total.toFixed(2));
  };
  const handleReset = () => {
    setDistance("");
    setTrafficjamTime("");
    setresult("0.00");
    setPricePerDistance("0.00");
    setPricePerTrafficJam("0.00");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/taxi.png")}
            style={styles.imglogo}
          />
          <Text style={styles.appname}>คำนวนค่าแท็กซี่</Text>
          <View style={styles.cardInput}>
            <Text style={styles.labelInput}>ระยะทาง (กิโลเมตร)</Text>
            <TextInput
              placeholder="0.0"
              keyboardType="numeric"
              style={[styles.textInput]}
              value={distance}
              onChangeText={setDistance}
              placeholderTextColor="#9e9e9eff"
            />

            <Text style={styles.labelInput}>เวลาที่รถติด (นาที)</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              style={[styles.textInput]}
              value={trafficjamTime}
              onChangeText={setTrafficjamTime}
              placeholderTextColor="#9e9e9eff"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity style={styles.buttonCal}>
                <Text
                  style={[styles.buttonText, { color: "#ffffff" }]}
                  onPress={handleCal}
                >
                  คํานวณค่ารถ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonReset}>
                <Text
                  style={[styles.buttonText, { color: "red" }]}
                  onPress={handleReset}
                >
                  ล้างค่า
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardResult}>
            <Text
              style={[styles.textResult, { fontSize: 18, textAlign: "center" }]}
            >
              ค่าโดยสารโดยประมาณ
            </Text>
            <Text
              style={[
                styles.textResult,
                {
                  fontSize: 42,
                  fontFamily: "Kanit_700Bold",
                  color: "#ffc72c",
                  textAlign: "center",
                },
              ]}
            >
              {result}
              <Text
                style={[styles.textResult, { fontSize: 18, color: "#ffc72c" }]}
              >
                {" "}
                บาท
              </Text>
            </Text>
            <View style={styles.divider}></View>
            <View style={styles.row}>
              <Text style={[styles.textResult, { fontSize: 14 }]}>
                ค่าโดยสารตามระยะทาง
              </Text>
              <Text style={[styles.textResult, { fontSize: 14 }]}>
                {pricePerDistance} บาท
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.textResult, { fontSize: 14 }]}>
                ค่ารถติด (นาที)
              </Text>
              <Text style={[styles.textResult, { fontSize: 14 }]}>
                {pricePerTrafficJam} บาท
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    padding: 18,
    marginTop: 20,
  },
  appname: {
    color: "#ffc72c",
    marginTop: 8,
    fontFamily: "Kanit_700Bold",
    fontSize: 28,
  },
  imglogo: {
    width: 135,
    height: 135,
    marginTop: 18,
  },
  cardInput: {
    marginTop: 18,
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 9,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  labelInput: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 17,
    marginBottom: 8,
    color: "#000000",
  },
  textInput: {
    backgroundColor: "#dfdddd",
    borderRadius: 6,
    padding: 11,
    marginBottom: 10,
    fontSize: 15,
  },
  buttonCal: {
    padding: 9,
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#015f28ff",
    flex: 2,
    marginRight: 10,
  },
  buttonReset: {
    padding: 9,
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderColor: "#ff0000",
    borderWidth: 2,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Kanit_600SemiBold",
    textAlign: "center",
  },
  cardResult: {
    marginTop: 18,
    width: "100%",
    backgroundColor: "#2F3542",
    borderRadius: 9,
    padding: 18,
    shadowColor: "#000000ff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textResult: {
    marginTop: 4,
    fontFamily: "Kanit_700Bold",
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#ffffff",
    marginVertical: 10,
  },
});
