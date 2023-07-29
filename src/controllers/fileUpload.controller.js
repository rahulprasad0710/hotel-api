import fileUploadService from "../services/fileUpload.service.js";

const uploadFile = async (req, res) => {
    const data = await fileUploadService.uploadFile(
        req.files,
        req.body.relatedTo
    );

    if (!data) {
        res.status(400).json({
            success: false,
            data: null,
            message: "File Not Uploaded.",
        });
    }

    return res.status(201).json({
        success: true,
        data,
        message: "file created successfully",
    });
};

const cloudUpload = async (req, res) => {
    const data = await fileUploadService.uploadImageToCloudinary(
        req.files,
        req.body.relatedTo
    );

    if (!data) {
        res.status(400).json({
            success: false,
            data: null,
            message: "File Not Uploaded.",
        });
    }

    return res.status(201).json({
        success: true,
        data,
    });
};

export default { uploadFile, cloudUpload };
