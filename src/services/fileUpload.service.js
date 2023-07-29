/* eslint-disable no-console */

import { FileData } from "../models/files.model.js";
import moveFile from "../utils/moveFile.js";
import AppError from "../utils/AppError.js";
import CloudinaryUpload from "../utils/cloudinary.js";

const uploadFile = async (files, relatedPath) => {
    const filesArray = [];
    if (!files || files?.length === 0)
        throw new AppError("No files found", 400);
    if (!relatedPath) throw new AppError("No related path found", 400);

    console.log({ files, relatedPath });

    files.forEach((file) => {
        const { filename, path, size, mimetype, originalname } = file;
        // move file from temp folder to uploads relatedTO folder
        moveFile(path, path.replace("temp", relatedPath));
        const extension = path.split(".").pop();
        const fileType = mimetype.split("/")[0];
        const relatedTo = relatedPath;
        const data = {
            filename,
            originalname,
            size,
            extension,
            mimetype,
            fileType,
            relatedTo,
        };
        filesArray.push(data);
    });

    if (filesArray.length > 0) {
        const file = await FileData.insertMany(filesArray);
        return file;
    }
    return false;
};

async function uploadImageToCloudinary(files, relatedTo) {
    console.log({ files, relatedTo }, "cloud");

    if (!files || files?.length === 0)
        throw new AppError("No files found", 400);
    if (!relatedTo) throw new AppError("No related path found", 400);

    // check if all files are images
    const isAllImages = files.every((file) => file.mimetype.includes("image"));
    if (!isAllImages) throw new AppError("Only images are allowed", 400);

    // Wait for all upload promises to resolve
    const filesArray = await Promise.all(
        files.map(async (file) => {
            const { filename, originalname, mimetype } = file;
            const result = await CloudinaryUpload(file.path);

            if (result.name === "Error") {
                console.log("Upload Failed", result);
                throw new AppError(result.message, result.http_code);
            } else {
                console.log("Upload successful:", result);
                const fileType = mimetype.split("/")[0];
                const data = {
                    filename,
                    originalname,
                    size: result.bytes,
                    extension: result.format,
                    mimetype: result.resource_type,
                    fileType,
                    relatedTo,
                    dimensions: {
                        width: result?.width,
                        height: result?.height,
                    },
                    cloudPath: result.secure_url,
                };
                return data;
            }
        })
    );

    if (filesArray.length > 0) {
        const file = await FileData.insertMany(filesArray);
        return file;
    }
    return false;
}

export default {
    uploadFile,
    uploadImageToCloudinary,
};
