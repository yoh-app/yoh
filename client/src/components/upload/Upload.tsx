import React, { useState } from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
// import XHR from '@uppy/xhr-upload';
import { Dashboard } from '@uppy/react';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css'
import Chinese from '@uppy/locales/lib/zh_CN';
import { useEffect } from 'react';
import axios from '../../utils/axios';
import { useSignUploadUrlMutation, useCreateOneAttachmentMutation } from '../../generated';
import ImageEditor from '@uppy/image-editor'

function Upload(props) {
  const [signUploadUrl] = useSignUploadUrlMutation();
  const [createAttachment] = useCreateOneAttachmentMutation();

  const { height = 400 } = props;
  let allowedFileTypes = ['image/*', 'audio/*', 'video/*', '.pdf', '.doc', '.docx'];
  switch (props.attachmentType) {
    case 'document':
      allowedFileTypes = ['.pdf', '.doc', '.docx'];
      break;
    case 'image':
      allowedFileTypes = ['image/*'];
      break;
    case 'audio':
      allowedFileTypes = ['audio/*'];
      break;
    case 'video':
      allowedFileTypes = ['video/*'];
      break;
    default:
      break;
  }

  const uppy = typeof document !== 'undefined' && React.useMemo(() => {
    return new Uppy({
      id: props?.id || 'uppy',
      meta: props.meta || {},
      restrictions: {
        maxNumberOfFiles: props.maxNumberOfFiles || null,
        allowedFileTypes,
        maxFileSize: props.maxFileSize || null, //  byte
      },
      autoProceed: props.autoProceed || false,
      // locale: Chinese,
    }).use(ImageEditor, {
      // target: 'uppy',
      id: 'ImageEditor'
      // quality: 0.8,
    }).use(AwsS3, {
      getUploadParameters(file) {
        return axios
          .post(`${window?.location?.origin}/api/s3`, {
            filename: props.path,
            contentType: file.type,
            acl: 'public-read',
          })
          .then((result) => {
            return {
              method: 'put',
              url: result.data,
              fields: [],
              headers: {
                'x-amz-acl': 'public-read',
                'content-type': file.type,
              },
            };
          });
      },
      // note: using rest instead of gql for progress bar showing
      // getUploadParameters(file) {
      //   return signUploadUrl({
      //     variables: {
      //       filename: file.name,
      //       contentType: file.type,
      //       acl: 'public-read',
      //     },
      //   }).then((result) => {
      //     return {
      //       method: 'put',
      //       url: result.data.signUploadUrl,
      //       fields: [],
      //       headers: {
      //         'x-amz-acl': 'public-read',
      //         'content-type': file.type,
      //       },
      //     };
      //   });
      // },
    }).on('complete', async (result) => {
      // const url = result.successful[0].uploadURL;
      await Promise.all(
        result.successful.map(async (newFile) => {
          if (props?.model?.name === 'Attachment') {
            let type
            const fileName = newFile?.name?.toLowerCase()
            if (fileName.includes('webp') || fileName.includes('jpeg') || fileName.includes('jpg') || fileName.includes('png')) {
              type = 'image'
            } else if (fileName.includes('mov') || fileName.includes('mp4')) {
              type = 'video'
            } else if (fileName.includes('mp3') || fileName.includes('wav')) {
              type = 'audio'
            } else if (fileName.includes('pdf') || fileName.includes('doc') || fileName.includes('docx')) {
              type = 'document'
            }
            props?.setState(newFile);
            props?.setValue(props?.field?.name, newFile, { shouldValidate: true, shouldDirty: true });
            // if (props?.field?.name === 'attachmentObj') {
            //   props?.setValue('attachmentType', type, { shouldValidate: true, shouldDirty: true });
            // }
            props?.setType(type)
          } else {
            return createAttachment({
              variables: {
                data: {
                  url: newFile.uploadURL,
                  upload: JSON.parse(JSON.stringify(newFile)),
                  // type: props.attachmentType,
                },
              },
            });
          }

        })
      );
      const urls = result.successful.map((newFile) => {
        return {
          url: newFile.uploadURL,
        };
      });

      props.onComplete && props.onComplete(urls);
    }).on('upload-error', (file, error, response) => {
      console.log(error);
    });
    // or
  }, [])
  React.useEffect(() => {
    return () => uppy.close({ reason: 'unmount' })
  }, [uppy])

  // const uppy = new Uppy({
  //   meta: props.meta || {},
  //   restrictions: {
  //     maxNumberOfFiles: props.maxNumberOfFiles || null,
  //     allowedFileTypes,
  //     maxFileSize: props.maxFileSize || null, //  byte
  //   },
  //   autoProceed: props.autoProceed || false,
  //   // locale: Chinese,
  // });
  return (
    <div className="mb-5">
      <Dashboard plugins={['ImageEditor']} height={height} uppy={uppy} />
    </div>
  );
}

export default Upload;