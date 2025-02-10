import ImageKit from "imagekit";
import config from "../config/config";

type UploadResponse = {
    fileId: string;
    url: string;
};

type FileDetailsResponse = {
    url: string;
};

export class ImageKitService {
    private imageKit: ImageKit;

    constructor() {
        this.imageKit = new ImageKit({
            publicKey: config.IMAGEKIT_PUBLIC_KEY,
            privateKey: config.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: config.IMAGEKIT_ENDPOINT_URL
        });
    }

    async uploadImage(file: File, userId: string): Promise<string | null> {
        try {
            const fileName = `profil/${userId}`;
            const fileBuffer = await file.arrayBuffer();
            const fileBase64 = typeof Buffer !== 'undefined' ? Buffer.from(fileBuffer).toString("base64") : '';

            if (!fileBase64) {
                throw new Error("Buffer is not available in this environment.");
            }

            console.info("Uploading image to ImageKit", { fileName, fileSize: file.size, mimeType: file.type });

            const uploadResponse: UploadResponse = await this.imageKit.upload({
                file: fileBase64,
                fileName,
                folder: "/profile-pictures",
                useUniqueFileName: false
            }) as UploadResponse;

            return uploadResponse.fileId;
        } catch (error) {
            console.error("ImageKit upload error:", error);
            throw error;
        }
    }

    async getImageUrl(fileId: string): Promise<string | null> {
        try {
            console.info("Generating URL for file", { fileId });
            const fileDetails: FileDetailsResponse = await this.imageKit.getFileDetails(fileId) as FileDetailsResponse;
            return fileDetails.url || null;
        } catch (error) {
            console.error("ImageKit URL generation error:",error);
            throw error;
        }
    }

    async deleteImage(fileId: string): Promise<boolean> {
        try {
            console.info("Deleting image from ImageKit", { fileId });
            await this.imageKit.deleteFile(fileId);
            return true;
        } catch (error) {
            console.error("ImageKit delete error:",error);
            throw error;
        }
    }
}
