import aws from 'aws-sdk';
import uuidv4 from 'uuid/v4';

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION,
});
export const s3 = new aws.S3();

export const processSingleUpload = async (upload: any, path = '') => {
    const { createReadStream, filename } = await upload;
    const stream = createReadStream();
    const params = {
        Bucket: 'iamhrayr-portfolio',
        Key: `${path}/${uuidv4()}-${filename}`,
        Body: stream,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err: any, data: any) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

export const processBulkUpload = async (uploads: any, path = '') => {
    const promises: Promise<any>[] = [];

    uploads.forEach((upload: any) => {
        const promise = new Promise(async (resolve, reject) => {
            const { createReadStream, filename } = await upload;

            const stream = createReadStream();
            const params = {
                Bucket: 'iamhrayr-portfolio',
                Key: `${path}/${uuidv4()}-${filename}`,
                Body: stream,
            };

            s3.upload(params, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });

        promises.push(promise);
    });

    return Promise.all(promises);
};

export const deleteFiles = async (files: any) => {
    const objectsToDelete = files.map((f: any) => ({ Key: f.key }));
    const params = {
        Bucket: 'iamhrayr-portfolio',
        Delete: {
            Objects: objectsToDelete,
            Quiet: false,
        },
    };

    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
