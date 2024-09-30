import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCreateOneVideoViewMutation } from '@generated';

export const VideoViewTracker: React.FC = ({ video }) => {
  const router = useRouter();
  const [createVideoView] = useCreateOneVideoViewMutation();
  useEffect(() => {
    async function setupPageView() {
      if (router) {
        let videoView = localStorage.getItem(router.asPath);
        videoView = !!videoView ? JSON.parse(videoView) : null;
        if (!videoView) {
          const { data } = await createVideoView({
            variables: {
              data: {
                video: {
                  connect: {
                    slug: video.slug,
                  },
                },
              },
            },
          });
          localStorage.setItem(router.asPath, JSON.stringify(data?.createOneVideoView));
        } else {
          if (new Date().getTime() - new Date(videoView.createdAt).getTime() > 86400000) {
            const { data } = await createVideoView({
              variables: {
                data: {
                  video: {
                    connect: {
                      slug: video.slug,
                    },
                  },
                },
              },
            });
            localStorage.setItem(router.asPath, JSON.stringify(data?.createOneVideoView));
          }
        }
      }
    }
    setupPageView();
  }, [router]);

  return null;
};
