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
			permissions: ["android.permission.CAMERA", "android.permission.WRITE_EXTERNAL_STORAGE"]
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
        apiKey: process.env.API_KEY || "AIzaSyD_dhXrU5-3m_QsUAka7FVavlGTgNTlppI",
        authDomain: process.env.AUTH_DOMAIN || "crypta-d5e13.firebaseapp.com",
        projectId: process.env.PROJECT_ID || "crypta-d5e13",
        storageBucket: process.env.STORAGE_BUCKET || "crypta-d5e13.firebasestorage.app",
        messagingSenderId: process.env.MESSAGING_SENDER_ID || "539604836728",
        appId: process.env.APP_ID || "1=539604836728=web=5876a760ea6bf2189ee88d",
        measurementId: process.env.MEASUREMENT_ID || "G-X7J7VJSX4N",
      },
      imageKit: {
        publicKey:
          process.env.IMAGEKIT_PUBLIC_KEY ||
          "public_UhrmHHThLKc8Yp4wVNknKOIEs24=",
        privateKey:
          process.env.IMAGEKIT_PRIVATE_KEY ||
          "private_SpjOedTubXZQ5QiMXTvAHygzRXM=",
        endpointUrl:
          process.env.IMAGEKIT_ENDPOINT_URL ||
          "https://ik.imagekit.io/qmegcemhav",
      },
    },
    owner: "tsitonyavo",
  },
};
