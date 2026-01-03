
import { useState } from "react";
import { upload } from "@imagekit/react";
import { imagegkitAuthenticator } from "../api/user.api";

interface ImageKitResponse {
    fileId: string;
    name: string;
    url: string;
    thumbnailUrl: string;
    height: number;
    width: number;
    size: number;
    fileType: string;
    filePath: string;
    tags?: string[];
    isPrivateFile?: boolean;
    customCoordinates?: string;
    metadata?: any;
}

export const useImageKit = () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const authenticator = async () => {
        try {
            const response = (await imagegkitAuthenticator()) as any;

            if (!response) {
                throw new Error("Authentication request failed");
            }
            return response;
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const uploadFile = async (
        file: File,
        fileName?: string
    ): Promise<ImageKitResponse> => {
        setIsUploading(true);
        setProgress(0);
        setError(null);

        try {
            const { signature, expire, token, publicKey } = await authenticator();

            const result = await upload({
                file,
                fileName: fileName || file.name,
                expire,
                token,
                signature,
                publicKey,
                onProgress: (event: any) => {
                    setProgress((event.loaded / event.total) * 100);
                },
            });

            return result as ImageKitResponse;

        } catch (err: any) {
            setError(err.message || "Upload failed");
            throw err;
        } finally {
            setIsUploading(false);
        }
    }

    return {
        progress,
        isUploading,
        error,
        uploadFile
    };
};
