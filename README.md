# gcs-transfer-to-backblaze
This module transfer a publicly available GCS content into Backblaze.

# Requirements
- You need a publicly accessible Google Cloud Storage (GCS) url
- You need to have an account and B2 bucket created on Backblaze
- You need to have the Backblaze B2 API credentials (BACKBLAZE_B2_KEYID and BACKBLAZE_B2_ACCESSKEY) defined in a `.env` file

# How to Install
> npm install gcs-transfer-to-backblaze

# How to Use
In your code:
``
import {gcs2backblazeb2} from "gcs-transfer-to-backblaze"
``

or 

``
const {gcs2backblazeb2} = require(gcs-transfer-to-backblaze) 
``

then, simply call the function with the required parameters: 

> gcs2backblazeb2(url, b2_bucket, b2_endpoint, b2_region)


``
url: the publicly accessible GCS url	
``

``
b2_bucket: your Backblaze B2 bucket	
``

``
b2_endpoint: your Backblaze B2 endpoint	
``

``
b2_region: your Backblaze B2 region	
``

## Return response
- Returns true if the operation is sucessful 
- Returns false if the operation failed
