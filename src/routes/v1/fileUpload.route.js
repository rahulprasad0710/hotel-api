import express from "express";
import fileUploadController from "../../controllers/fileUpload.controller.js";
import { uploadFile } from "../../middlewares/multer.js";
import {
    verifyAdmin,
    checkPermission,
} from "../../middlewares/authorization.js";
import asyncTryCatchFn from "../../utils/tryCatch.js";
import { PERMISSION } from "../../constant/AppEnum.js";

const router = express.Router();

router.post(
    "",
    uploadFile.array("file", 10),
    asyncTryCatchFn(fileUploadController.uploadFile)
);

// @ route POST /api/v1/file-upload/cloud

router.post(
    "/cloud",
    uploadFile.array("file", 10),

    asyncTryCatchFn(fileUploadController.cloudUpload)
);

//  verifyAdmin,
//     checkPermission(PERMISSION.IMAGE_UPLOAD),

export default router;
