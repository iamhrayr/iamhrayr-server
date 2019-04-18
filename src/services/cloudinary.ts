import { v2 as cloudinary } from 'cloudinary';

export const processSingleUpload = (upload: any, folder?: string, transformation?: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder, transformation }, (err: any, image: any) => {
            if (err) reject(err);
            resolve(image);
        });

        const { createReadStream } = await upload;
        const readStream = createReadStream();
        readStream.pipe(uploadStream);
    });
};

export const processBulkUpload = async (upload: any, folder?: string, transformation?: any): Promise<any> => {
    const uploads = await upload;
    const promises: Promise<any>[] = [];

    uploads.forEach((el: any) => {
        const promise = new Promise(async (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder, transformation },
                (err: any, image: any) => {
                    if (err) reject(err);
                    resolve(image);
                },
            );

            const { createReadStream } = await el;
            const readStream = createReadStream();
            readStream.pipe(uploadStream);
        });
        promises.push(promise);
    });

    return Promise.all(promises);
};
