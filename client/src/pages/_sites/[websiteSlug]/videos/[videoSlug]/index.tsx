import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { HtmlTag } from "admin/src/components/craft/selectors/HtmlTag";
// import { HtmlText } from "admin/src/components/craft/selectors/HtmlText";
// import { HtmlImg } from "admin/src/components/craft/selectors/HtmlImg";
// import { HtmlButton } from "admin/src/components/craft/selectors/HtmlButton";

// import { HtmlSection } from "admin/src/components/craft/selectors/HtmlSection";
// import { Collection } from "admin/src/components/craft/selectors/Collection";
// import { Embed } from "admin/src/components/craft/selectors/Embed";

// import { Root } from "admin/src/components/craft/selectors/Root";
// import { Editor, Frame } from "@craftjs/core";
import React, { useEffect, useRef } from "react";
import prisma from "admin/src/server/context/prisma";
import {
  // Grid,
  Button as MuiButton,
  // Card,
  // CardHeader,
  // CardContent,
  TextField,
  Typography,
} from "@mui/material";

import Link from "next/link";

import RequestBlockDesktop from "@components/request/request-block-desktop";
import RequestBlockMobile from "@components/request/request-block-mobile";
import { useWindowSize } from "@utils/use-window-size";
// import { Network, Alchemy } from "alchemy-sdk";
// import { CraftProvider } from "admin/src/components/craft/editor/CraftContext";
import processWebsite from "@process/website";
import { processVideo } from "@process/media";
import { VideoViewTracker } from "@components/videoViewTracker";
import { useSettings } from "@contexts/settings.context";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useTranslation } from "next-i18next";
// import { useAccount } from "wagmi";

export default function Home({ video, website }: Record<string, any>) {
  const size = useWindowSize();
  const [showRequests, setShowRequests] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const isMobile = size.width < 768;
  const {
    requests,
    hasRequests,
    locked,
    loadingNFT,
    setPassword,
    setLocked,
    password,
  } = useSettings();

  const { t } = useTranslation("common");
  const router = useRouter();

  const iframeRef = useRef(null);

  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center bg-light relative">
        <Spinner text="Loading" />
      </div>
    );
  }

  if (video?.password && locked) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Typography>{t("unlockPageWithPassword")}</Typography>
        <br />
        <TextField
          size="small"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
        />
        <MuiButton
          size="large"
          onClick={() => {
            if (password === video.password) {
              setLocked(false);
            }
          }}
        >
          verify
        </MuiButton>
      </div>
    );
  }

  const handleResize = (event: Event) => {
    if (iframeRef.current) {
      iframeRef.current.height = window.innerHeight - 80;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [iframeRef]);
  return (
    <>
      <NextSeo
        openGraph={{
          url: `https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/videos/${video?.slug}`,
          title: video?.name,
          description: video?.description,
          images: [
            { url: website?.imageObj?.url },
            { url: video?.imageObj?.url },
          ],
          site_name: website?.name,
        }}
        title={video?.name}
        description={video?.description}
        canonical={`https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/videos/${video?.slug}`}
      />
      {hasRequests && (
        <RequestBlockDesktop showRequests={true} requests={requests} />
      )}
      <div
        className="bg-light min-h-screen pt-20"
        style={
          hasRequests && !isMobile
            ? {
              width: "calc(100% - 300px)",
              marginRight: "300px",
              // padding: '20px',
            }
            : hasRequests && isMobile
              ? {
                marginBottom: "170px",
              }
              : null
        }
      >
        {video?.isYoutube ? (
          <iframe
            ref={iframeRef}
            width="560"
            height="315"
            src={video.externalUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              width: "100%",
            }}
          ></iframe>
        ) : (
          <video
            style={{
              width: "100%",
              maxHeight: "calc(100vh - 5rem)",
            }}
            controls
          >
            <source
              src={
                video?.isExternalLink ? video?.externalUrl : video?.videoObj?.url
              }
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {hasRequests && (
        <RequestBlockMobile showRequests={showRequests} requests={requests} />
      )}
      {video && <VideoViewTracker video={video} />}
    </>
  );
}

export const getStaticPaths = async ({ locales }) => {
  // const pages = await prisma.page.findMany({
  //   where: {},
  //   include: {
  //     website: true,
  //   },
  // });
  // const paths = pages
  //   .filter((page) => page.active && !page.deleted && page.website && page.website.active && !page.website.deleted)
  //   .map((page) =>
  //     locales.map((locale) => ({
  //       params: {
  //         pageSlug: page?.slug,
  //         websiteSlug: page?.website?.slug,
  //       },
  //       locale, // Pass locale here
  //     })),
  //   )
  //   .flat();
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error("No path parameters found");

  const { videoSlug, websiteSlug } = params;
  console.log(videoSlug, "this is video slug");
  const video = await prisma.video.findUnique({
    where: {
      slug: videoSlug,
    },
    include: {
      website: true,
    },
  });
  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug,
    },
    include: {
      videos: {
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          imageObj: true,
          isIndex: true,
          isExternalLink: true,
          externalUrl: true,
        },
      },
    },
  });

  if (!video || !website)
    return {
      notFound: true,
      // revalidate: 10,
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      video: processVideo(video),
      ...(await serverSideTranslations(locale!, ["common"])),
    },
    // revalidate: 20,
  };
};
