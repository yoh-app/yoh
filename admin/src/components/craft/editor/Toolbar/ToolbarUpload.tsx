// import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Select } from '@mui/material';
// import { Uppload, en, Local, Preview, Crop } from 'uppload';
// import { useCreateOneImageMutation, useFindManyImageQuery } from 'generated';
// import firebase from 'firebase/app';
// import 'firebase/storage';

// import { IUploader } from 'uppload';

// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';

// import 'uppload/dist/uppload.css';
// import 'uppload/dist/themes/light.css';

// const config = {
//   apiKey: 'AIzaSyDTo8JMStEOGSW-zb4Pw0jE8aiqZaLVh60',
//   projectId: 'pixite-47782',
//   storageBucket: 'pixite-47782.appspot.com',
//   childPath: 'uppload',
//   path: '/',
// };

// const uploader: IUploader = (file, updateProgress) =>
//   new Promise((resolve, reject) => {
//     if (!firebase?.apps?.length) {
//       firebase.initializeApp(config);
//     }
//     const storageReference = firebase.storage().ref(config.path);
//     const reference = storageReference.child(
//       `${config.childPath || ''}/${file.name}`
//     );
//     const uploadTask = reference.put(file);
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         if (updateProgress) updateProgress(progress);
//       },
//       (error) => {
//         console.log('Got error', error);
//         return reject(new Error('unable_to_upload'));
//       },
//       () => {
//         console.log('Uploaded!');
//         uploadTask.snapshot.ref
//           .getDownloadURL()
//           .then((url) => resolve(url))
//           .catch(() => reject(new Error('unable_to_upload')));
//       }
//     );
//   });

// export const ToolbarUpload = ({ value, onChange }: any) => {
//   const [createImage] = useCreateOneImageMutation();
//   const { data, refetch } = useFindManyImageQuery();
//   const [uppload, setUppload] = useState(null);

//   useEffect(() => {
//     setUppload(
//       new Uppload({
//         lang: en,
//         defaultService: 'local',
//         uploader,
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (uppload) {
//       uppload.use([new Local(), new Preview(), new Crop()]);
//       uppload.on('close', () => {
//         const upploadModal = document.querySelector('.uppload-container');
//         if (!upploadModal) return;

//         upploadModal.remove();
//       });
//       uppload.on('upload', async (url) => {
//         onChange(url);
//         await createImage({
//           variables: {
//             data: {
//               url,
//             },
//           },
//         });
//         refetch();
//         uppload.close();
//       });
//     }
//   }, [uppload]);

//   return (
//     <FormControl>
//       <Button onClick={() => uppload.open()}>Upload</Button>
//       <br />
//       <Grid container spacing={2}>
//         {data?.findManyImage.map((image, index) => {
//           return (
//             <Grid item key={index}>
//               <Card>
//                 <CardActionArea onClick={() => onChange(image.url)}>
//                   <CardMedia
//                     component="img"
//                     style={{ height: '50px', width: '50px' }}
//                     image={image.url}
//                   />
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </FormControl>
//   );
// };

import React, { useEffect, useState } from 'react';
// import { Button, FormControl, InputLabel, Select } from '@mui/material';
// import { Uppload, en, Local, Preview, Crop } from 'uppload';
import firebase from 'firebase/app';
import 'firebase/storage';

// import { IUploader } from 'uppload';

// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardMedia from '@mui/material/CardMedia';
// import Grid from '@mui/material/Grid';

import { Card } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
// import { Button } from '@paljs/ui/Button';
// import { getImage } from 'helpers/cloudinary';
// import 'uppload/dist/uppload.css';
// import 'uppload/dist/themes/light.css';

export const ToolbarUpload = ({ value, onChange }: any) => {
  return null;
};

// export const ToolbarUpload = ({ value, onChange }: any) => {
//   const [widget, setWidget] = useState(null);
//   const [displayImage, setDisplayImage] = useState(null);

//   useEffect(() => {
//     if (value) {
//       setDisplayImage(value);
//     }
//   }, [value]);

//   useEffect(() => {
//     setWidget(
//       window?.cloudinary?.createUploadWidget(
//         {
//           cloudName: 'stylechain',
//           uploadPreset: 'ml_default',
//         },
//         (error, result) => {
//           if (!error && result && result.event === 'success') {
//             onChange(getImage(result.info.public_id));
//             setDisplayImage(getImage(result.info.public_id));
//             console.log('Done! Here is the image info: ', result.info);
//           }
//         }
//       )
//     );
//   }, []);

//   // useEffect(() => {
//   //   register({ name: field.name, required: field.required });
//   // }, [register]);

//   return (
//     <FormControl>
//       <Button
//         onClick={(e) => {
//           e.preventDefault();
//           widget.open();
//         }}
//       >
//         Upload
//       </Button>
//       <br />
//       {displayImage && <img width={300} src={displayImage} />}
//     </FormControl>
//   );

//   // const [createImage] = useCreateOneImageMutation();
//   // const { data, refetch } = useFindManyImageQuery();
//   // const [uppload, setUppload] = useState(null);
//   // const [currentImage, setCurrentImage] = useState(value);
//   // useEffect(() => {
//   //   setUppload(
//   //     new Uppload({
//   //       lang: en,
//   //       defaultService: 'local',
//   //       uploader,
//   //     }),
//   //   );
//   // }, []);

//   // useEffect(() => {
//   //   if (uppload) {
//   //     uppload.use([new Local(), new Preview(), new Crop()]);
//   //     uppload.on('close', () => {
//   //       const upploadModal = document.querySelector('.uppload-container');
//   //       if (!upploadModal) return;

//   //       upploadModal.remove();
//   //     });
//   //     uppload.on('upload', async (url) => {
//   //       setValue(field.name, url);
//   //       setCurrentImage(url);
//   //       await createImage({
//   //         variables: {
//   //           data: {
//   //             url,
//   //             // TODO: need to connect the correspond model of image
//   //           },
//   //         },
//   //       });
//   //       refetch();
//   //       uppload.close();
//   //     });
//   //   }
//   // }, [uppload]);

//   // useEffect(() => {
//   //   register({ name: field.name, required: field.required });
//   // }, [register]);

//   // return (
//   //   <div style={{ padding: '10px' }}>
//   //     <Row spacing={3}>
//   //       {currentImage?.length > 0 && (
//   //         <Col breakPoint={{ xs: 12, sm: 6 }}>
//   //           <a>
//   //             <img style={{ objectFit: 'cover', width: '300px', height: '300px' }} src={currentImage} />
//   //           </a>
//   //         </Col>
//   //       )}
//   //       <Col breakPoint={{ xs: 12, sm: 6 }}>
//   //         <Row style={{ margin: '10px' }}>
//   //           <Button
//   //             size="Small"
//   //             onClick={(e) => {
//   //               e.preventDefault();
//   //               uppload.open();
//   //             }}
//   //           >
//   //             Upload
//   //           </Button>
//   //         </Row>
//   //         <Row spacing={2}>
//   //           {data?.findManyImage.map((image, index) => {
//   //             return (
//   //               <Col style={{ cursor: 'pointer', margin: '5px' }} breakPoint={{ xs: 2 }} key={index}>
//   //                 <a
//   //                   onClick={() => {
//   //                     setValue(field.name, image.url);
//   //                     setCurrentImage(image.url);
//   //                   }}
//   //                 >
//   //                   <img
//   //                     style={{
//   //                       objectFit: 'cover',
//   //                       width: '60px',
//   //                       height: '60px',
//   //                     }}
//   //                     src={image.url}
//   //                   />
//   //                 </a>
//   //               </Col>
//   //             );
//   //           })}
//   //         </Row>
//   //       </Col>
//   //     </Row>
//   //   </div>
//   // );
// };

// // export default ToolbarUpload;
