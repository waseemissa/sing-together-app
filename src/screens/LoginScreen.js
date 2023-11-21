import {
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// NPM Imports
import { Formik } from "formik";
import * as Yup from "yup";

// Assets
import Logo from "../../assets/images/logo-black.png";

const LoginScreen = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleLogin = (values) => {
    console.log("Email:", values.email);
    console.log("Password:", values.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        validateOnChange
      >
        {(formikProps) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            {/* Logo */}
            <Image source={Logo} style={styles.logo} />

            {/* Email Input */}
            <TextInput
              label='Email'
              value={formikProps.values.email}
              onChangeText={formikProps.handleChange("email")}
              onBlur={formikProps.handleBlur("email")}
              style={styles.input}
              keyboardType='email-address'
              theme={{
                colors: {
                  primary: "black",
                },
              }}
              textColor='black'
              mode='flat'
            />
            {formikProps.touched.email && formikProps.errors.email && (
              <Text style={styles.errorText}>{formikProps.errors.email}</Text>
            )}

            {/* Password Input with Toggle Button */}
            <TextInput
              label='Password'
              value={formikProps.values.password}
              onChangeText={formikProps.handleChange("password")}
              onBlur={formikProps.handleBlur("password")}
              secureTextEntry={true}
              style={styles.input}
              theme={{
                colors: {
                  primary: "black",
                },
              }}
              textColor='black'
              mode='flat'
            />
            {formikProps.touched.password && formikProps.errors.password && (
              <Text style={styles.errorText}>
                {formikProps.errors.password}
              </Text>
            )}

            {/* Submit Button */}
            <Button
              mode='contained'
              onPress={formikProps.handleSubmit}
              style={styles.loginButton}
              labelStyle={styles.loginButtonText}
            >
              Login
            </Button>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
  },
  input: {
    backgroundColor: "transparent",
    width: "89%",
    marginBottom: 10,
    borderRadius: 6,
    borderColor: "black",
    color: "black",
  },
  errorText: {
    width: "89%",
    color: "red",
    textAlign: "left",
    marginTop: 1,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
    width: "90%",
    borderRadius: 2,
    backgroundColor: "black", // You can change the color to your preference
  },
  loginButtonText: {
    color: "white",
  },
});

export default LoginScreen;
