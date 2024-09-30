import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCreateOnePageViewMutation } from '@generated';

export const PageViewTracker: React.FC = ({ page }) => {
  const router = useRouter();
  const [createPageView] = useCreateOnePageViewMutation();
  useEffect(() => {
    async function setupPageView() {
      if (router) {
        let pageView = localStorage.getItem(router.asPath);
        pageView = !!pageView ? JSON.parse(pageView) : null;
        if (!pageView) {
          const { data } = await createPageView({
            variables: {
              data: {
                page: {
                  connect: {
                    slug: page.slug,
                  },
                },
              },
            },
          });
          localStorage.setItem(router.asPath, JSON.stringify(data?.createOnePageView));
        } else {
          if (new Date().getTime() - new Date(pageView.createdAt).getTime() > 86400000) {
            const { data } = await createPageView({
              variables: {
                data: {
                  page: {
                    connect: {
                      slug: page.slug,
                    },
                  },
                },
              },
            });
            localStorage.setItem(router.asPath, JSON.stringify(data?.createOnePageView));
          }
        }
      }
    }
    setupPageView();
  }, [router]);

  return null;
};
