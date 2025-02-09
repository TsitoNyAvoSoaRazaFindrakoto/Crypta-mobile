export default {
  expo: {
    name: "Crypta-mobile",
    slug: "crypta-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.mobile.crypta",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      googleServicesFile: "./config/firebase/google-services.json",
      permissions: [
        "android.permission.CAMERA",
        "android.permission.WRITE_EXTERNAL_STORAGE",
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-secure-store",
      [
        "expo-notifications",
        {
          icon: "./assets/icon.png",
          color: "#ffffff",
          sounds: ["./assets/audio/notif.wav"],
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "L'application souhaite accéder à vos photos.",
          cameraPermission: "L'application souhaite accéder à votre caméra.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "00877c72-aad3-40aa-8054-4f63af8163ab",
      },
      firebase: {
        apiKey: "AIzaSyD_dhXrU5-3m_QsUAka7FVavlGTgNTlppI",
        authDomain: "crypta-d5e13.firebaseapp.com",
        databaseURL: "https://crypta-d5e13-default-rtdb.firebaseio.com",
        projectId: "crypta-d5e13",
        storageBucket: "crypta-d5e13.firebasestorage.app",
        messagingSenderId: "539604836728",
        appId: "1:539604836728:web:5876a760ea6bf2189ee88d",
        measurementId: "G-X7J7VJSX4N",
      },
      imageKit: {
        publicKey: "public_UhrmHHThLKc8Yp4wVNknKOIEs24=",
        privateKey: "private_SpjOedTubXZQ5QiMXTvAHygzRXM=",
        endpointUrl: "https://ik.imagekit.io/qmegcemhav",
      },
    },
    owner: "tsitonyavo",
  },
};
