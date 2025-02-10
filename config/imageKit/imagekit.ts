import ImageKit from "imagekit-javascript";
import Constants from "expo-constants";
const extra = Constants.expoConfig?.extra;
export const imagekit = new ImageKit({
  publicKey: extra?.imageKit.publicKey,
  urlEndpoint: extra?.imageKit.endpointUrl,
});

interface UploadResponse {
  fileId: string;
  url: string;
  name: string;
}
