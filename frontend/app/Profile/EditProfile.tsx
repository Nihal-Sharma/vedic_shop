import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("Ved");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSave = () => {
    const userData = {
      firstName,
      lastName,
      email,
      mobile,
      gender: selectedGender,
    };
    console.log("Saved User Data:", userData);
    // TODO: integrate your API call here
  };

  return (
    <View style={styles.container}>
      {/* ← Back + Title */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* First + Last Name */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={[styles.input, styles.mt3]}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Gender Picker */}
      <Text style={[styles.label, styles.mt4]}>Gender</Text>
      <View style={[styles.row, styles.mt2]}>
        {["Male", "Female", "Other"].map((gender) => (
          <TouchableOpacity
            key={gender}
            onPress={() => setSelectedGender(gender)}
            style={styles.genderOption}
          >
            <View style={styles.radioOuter}>
              {selectedGender === gender && (
                <AntDesign name="check" size={14} color="#22c55e" />
              )}
            </View>
            <Text style={styles.genderText}>
              {gender === "Male" ? "🧍‍♂️" : gender === "Female" ? "🚶‍♀️" : "⚧"}{" "}
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Email + Mobile */}
      <TextInput
        style={[styles.input, styles.mt4]}
        placeholder="Email Id"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.mt3]}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffef8",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mt2: { marginTop: 8 },
  mt3: { marginTop: 12 },
  mt4: { marginTop: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  genderText: {
    marginLeft: 8,
    fontSize: 14,
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#f97316",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
