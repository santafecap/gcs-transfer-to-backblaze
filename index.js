const { Storage } = require('@google-cloud/storage');
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");


function gcs2backblazeb2(url, b2_bucket, b2_endpoint, b2_region) {

    // Creates a client for GCS
    const storage = new Storage();

    // Client for Backblaze
    const s3 = new S3Client({
      endpoint: b2_endpoint,
      region: b2_region,
      credentials:{
        accessKeyId: process.env.BACKBLAZE_B2_KEYID,
        secretAccessKey: process.env.BACKBLAZE_B2_ACCESSKEY
      }
    });
    
    //get the fileURL
    let fileURL = url;

    //extract the filepath
    let urlArr = fileURL.split('/');
    let fileName = urlArr[4] + '/' + urlArr[5];
    let bucketName = urlArr[3];

    //download from GCS
    //check if file exists first
    const checkGCSFile = await storage.bucket(bucketName).file(fileName);
    const filExists = (await checkGCSFile.exists())[0];

    if(filExists) {

      const contents = await storage.bucket(bucketName).file(fileName).download();

      //upload the content to backblaze
      const upload = new Upload({
          client: s3,
          params: {
            Bucket: b2_bucket,
            Key: fileName,
            Body: contents[0]
          },
      });
      await upload.done();

      res.json({msg: "Complete transfer of content"});

    }
    else {
      res.json({msg: "File does not exist"});
    }

}

module.exports = gcs2backblazeb2