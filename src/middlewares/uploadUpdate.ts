
import { NextFunction, Request, Response } from "express";
import * as multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from "../libs/cloudinaryConfig";


cloudinaryConfig();
console.log("ini broooo", process.env.CLOUD_NAME);
export const uploadUpdate = (filedName: string) => {

    // const storage = multer.memoryStorage();

    const storage = multer.diskStorage({
        destination: function (req, res, callback) {
            callback(null, './uploads/');
        },
        filename: function (req, file, callback) {
            const unixSuffix = Date.now();
            callback(null, file.fieldname + "-" + unixSuffix + ".png");
        }
    })

    const uploadFile = multer({ storage: storage });

    return (req: Request, res: Response, next: NextFunction) => {

        uploadFile.single(filedName)(req, res, async function (err: any) {

            const file = req.file;

            if (!file) {
                return res.status(400).json({ err: "no file upload" })
            }

            // res.locals.filename = req.file.filename
            // next();
            console.log("ini filenya bos", file);

            try {
                cloudinary.uploader.upload(file.path, (err, result) => {
                    if (err) {
                        return res.status(500).json({ err: "fail to upload cloudinary" })
                    }


                    res.locals.filename = result.secure_url
                    console.log("ini res local", res.locals.filename);
                    next();
                })

            } catch (err) {

                return res.status(500).json({
                    message: "masih error",
                    err: err
                });
            }
        });
    };
};