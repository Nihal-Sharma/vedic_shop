import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

const MAX_RESENDS = 3; // how many times the user can tap "Resend OTP"

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [counter, setCounter] = useState(59);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [resendCount, setResendCount] = useState(0);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  /* --------------------------------- timer --------------------------------- */
  useEffect(() => {
    let timer: number | undefined;
    if (isOtpSent && counter > 0) {
      timer = setInterval(
        () => setCounter((prev) => (prev > 0 ? prev - 1 : 0)),
        1000
      );
    }
    return () => clearInterval(timer);
  }, [isOtpSent, counter]);

  /* ------------------------------- handlers ------------------------------- */
  const sendOtp = () => {
    // here you would call your backend
    setCounter(59);
  };

  const handleGetOtp = () => {
    if (!phone || phone.length < 10)
      return Alert.alert("Error", "Please enter a valid phone number!");
    setIsOtpSent(true);
    setResendCount(0);
    setOtp(["", "", "", ""]);
    sendOtp();
  };

  const handleResendOtp = () => {
    if (resendCount >= MAX_RESENDS) return;
    setResendCount((prev) => prev + 1);
    setOtp(["", "", "", ""]);
    sendOtp();
  };

  const handleSubmitOtp = () => {
    const joined = otp.join("");
    if (joined.length < 4)
      return Alert.alert("Error", "Please enter a 4‑digit OTP.");
    if (joined !== "1234")
      return Alert.alert("Error", "Incorrect OTP. Please try again.");
    Alert.alert("Success", `Your OTP is ${joined}`, [
      { text: "OK", onPress: () => router.push({ pathname: "/(tabs)" }) },
    ]);
  };

  /* ------------------------------- renderers ------------------------------ */
  return (
    <View style={{ padding: 20 }}>
      {!isOtpSent ? (
        <>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: "#FFFEFA",
              marginTop: 15,
            }}
          >
            Enter Phone Number
          </Text>
          <TextInput
            placeholder="+91 Enter Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={{
              height: 45,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 600,
              marginTop: 10,
              paddingLeft: 10,
              backgroundColor: "white",
            }}
          />
          <TouchableOpacity
            onPress={handleGetOtp}
            style={{
              backgroundColor: "white",
              paddingVertical: 5,
              borderRadius: 100,
              marginTop: 20,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FF4726",
                fontSize: 18,
                fontFamily: "Poppins-Medium",
              }}
            >
              Get OTP
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFF",
              marginTop: 10,
            }}
          >
            OTP Verification
          </Text>
          <Text style={{ color: "#FFF", marginTop: 4 }}>
            We have sent a code to +91 {phone}
          </Text>

          {/* OTP boxes */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => {
                  otpRefs.current[i] = ref;
                }}
                value={digit}
                onChangeText={(val) => {
                  const num = val.replace(/\D/g, "").slice(0, 1);
                  const arr = [...otp];
                  arr[i] = num;
                  setOtp(arr);
                  if (num && i < otp.length - 1)
                    otpRefs.current[i + 1]?.focus();
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key !== "Backspace") return;
                  const arr = [...otp];
                  if (arr[i]) {
                    arr[i] = "";
                    setOtp(arr);
                    if (i > 0) otpRefs.current[i - 1]?.focus();
                  } else if (i > 0) {
                    arr[i - 1] = "";
                    setOtp(arr);
                    otpRefs.current[i - 1]?.focus();
                  }
                }}
                maxLength={1}
                keyboardType="number-pad"
                style={{
                  backgroundColor: "#FFF",
                  width: 50,
                  height: 50,
                  marginHorizontal: 5,
                  textAlign: "center",
                  fontSize: 20,
                  borderRadius: 10,
                }}
              />
            ))}
          </View>

          {/* counter / resend */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {!counter ? (
              resendCount < MAX_RESENDS ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text
                    style={{
                      color: "black",
                      textDecorationLine: "underline",
                    }}
                  >
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={{ color: "black" }}>Resend limit reached</Text>
              )
            ) : (
              <>
                <Text style={{ color: "black" }}>Didn't receive OTP? </Text>
                <Text style={{ color: "black", fontWeight: "600" }}>
                  Retry after{" "}
                </Text>
                <Text
                  style={{
                    color: "#FF4726",
                    fontWeight: "bold",
                    backgroundColor: "#FFFEFA",
                    borderRadius: 10,
                    paddingHorizontal: 5,
                  }}
                >
                  {counter}
                  <Text style={{ fontWeight: "500" }}> seconds</Text>
                </Text>
              </>
            )}
          </View>

          {/* submit */}
          <TouchableOpacity
            onPress={handleSubmitOtp}
            style={{
              backgroundColor: "#FFF",
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: "#FF4726", fontSize: 18, fontWeight: "bold" }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Login;
