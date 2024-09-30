import { S3, Endpoint } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import Cors from "cors"

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

async function handler(req, res) {
  // Run the middleware
  try {
    const cors = initMiddleware(
      // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
      Cors({
        origin: req.headers.origin,
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
      }),
    );

    await cors(req, res);
    const data = req.body;
    const s3 = new S3({
      apiVersion: '2006-03-01',
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
      endpoint: new Endpoint(process.env.SPACES_ENDPOINT),
      // bucket: process.env.SPACES_BUCKET,
      // region: config.region,
    });
    const url = await s3.getSignedUrl('putObject', {
      Bucket: process.env.SPACES_BUCKET,
      Key: uuidv4(),
      Expires: 300,
      ContentType: data.contentType,
      ACL: data.acl,
    });
    res.status(200).send(url);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
  // Rest of the API logic
  // res.json({ message: "Hello Everyone!" })
}

export default handler
