import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useSettings } from "@contexts/settings.context";
import { Grid } from "@mui/material";
import Iconify from "admin/src/components/Iconify";
import React, { useState } from "react";
import Link from "next/link";
import { themes } from "@themes/index";

import { Modal } from "@mui/material";

type Props = {
  setView: (value: boolean) => void;
  productData: any;
  variant?: "defaultView" | "modalView";
};

const NameWrapper = (name: any) => {
  return (
    <div
      className="absolute bottom-0 left-0 bg-white rounded-lg "
      style={{
        width: "90%",
        padding: "5px",
        margin: "5px",
        boxShadow: "rgb(0 0 0 / 5%) 5px 5px 10px",
      }}
    >
      {name}
    </div>
  );
};

const ProductDetails: React.FC<Props> = ({ setView, productData }) => {
  const { themeColor } = useSettings();
  const { t } = useTranslation("common");
  const [image, setImage] = useState(null);

  return (
    <div className="p-6 lg:px-8">
      {productData?.audios ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"lucide:headphones"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-audio")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.audios.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div
                    className="relative rounded-xl overflow-hidden cursor-pointer"
                    onClick={() =>
                      setView({ ...item, type: "audio", status: "purchased" })
                    }
                  >
                    <Image
                      src={item?.imageObj?.url ?? "/product-placeholder.svg"}
                      width="100%"
                      height="125%"
                      layout="responsive"
                      objectFit="cover"
                      alt={item?.name}
                      loader={({ src }) => {
                        return src;
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                      style={{ background: "rgba(0, 0, 0, 0.34)" }}
                    >
                      <div
                        className="border border-white text-white rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(0, 0, 0, 0.54)",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <Iconify icon={"icon-park-outline:waves"} />
                      </div>
                    </div>
                    <div className="absolute text-white">{item.name}</div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}
      {productData?.videos ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"icon-park-outline:film"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-video")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.videos.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div
                    className="relative rounded-xl overflow-hidden cursor-pointer"
                    onClick={() =>
                      setView({ ...item, type: "video", status: "purchased" })
                    }
                  >
                    <Image
                      src={item?.imageObj?.url ?? "/product-placeholder.svg"}
                      width="100%"
                      height="70%"
                      layout="responsive"
                      objectFit="cover"
                      alt={item?.name}
                      loader={({ src }) => {
                        return src;
                      }}
                    />
                    <div
                      className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                      style={{ background: "rgba(0, 0, 0, 0.34)" }}
                    >
                      <div
                        className="border border-white text-white rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(0, 0, 0, 0.54)",
                          width: "50px",
                          height: "50px",
                        }}
                      >
                        <Iconify icon={"fluent:play-32-regular"} />
                      </div>
                    </div>
                    <div className="absolute text-white">{item.name}</div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}
      {productData?.documents ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"lucide:file-text"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-document")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.documents.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <a target="_blank" href={item.documentObj.url}>
                    <div className="relative cursor-pointer">
                      <div className="relative rounded-xl overflow-hidden">
                        <Image
                          src={
                            item?.imageObj?.url ?? "/product-placeholder.svg"
                          }
                          width="100%"
                          height="70%"
                          layout="responsive"
                          objectFit="cover"
                          alt={item?.name}
                          loader={({ src }) => {
                            return src;
                          }}
                        />
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                          style={{ background: "rgba(0, 0, 0, 0.34)" }}
                        />
                      </div>
                      <NameWrapper name={item?.name}></NameWrapper>
                    </div>
                  </a>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}
      {productData?.links ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"ph:link-simple-bold"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-link")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.links.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div
                    className="relative cursor-pointer"
                    onClick={() =>
                      setView({ ...item, type: "link", status: "purchased" })
                    }
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src={item?.imageObj?.url ?? "/product-placeholder.svg"}
                        width="100%"
                        height="70%"
                        layout="responsive"
                        objectFit="cover"
                        alt={item?.name}
                        loader={({ src }) => {
                          return src;
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                        style={{ background: "rgba(0, 0, 0, 0.34)" }}
                      />
                      {item.hiddenMessage ? (
                        <div
                          className="absolute py-1 px-3"
                          style={{
                            backgroundColor: themes[themeColor].accent50,
                            color: themes[themeColor].accent900,
                          }}
                        >
                          {item.hiddenMessage}
                        </div>
                      ) : (
                        []
                      )}
                    </div>
                    <NameWrapper name={item?.name}></NameWrapper>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}

      {productData?.pictures ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"lucide:image"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-picture")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.pictures?.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div
                    onClick={() =>
                      setImage(
                        item?.imageObj?.url ?? "/product-placeholder.svg"
                      )
                    }
                    className="relative cursor-pointer"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <Image
                        src={item?.imageObj?.url ?? "/product-placeholder.svg"}
                        width="100%"
                        height="70%"
                        layout="responsive"
                        objectFit="cover"
                        alt={item?.name}
                        loader={({ src }) => {
                          return src;
                        }}
                      />
                      <div
                        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                        style={{ background: "rgba(0, 0, 0, 0.34)" }}
                      />
                    </div>
                    <NameWrapper name={item?.name}></NameWrapper>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}

      {productData?.pages ? (
        <>
          <div
            className="flex items-center font-bold gap-x-2"
            style={{
              color: themes[themeColor].accent900,
              marginTop: "60px",
              marginBottom: "24px",
            }}
          >
            <Iconify
              icon={"ic:round-art-track"}
              className="rounded-full text-white p-1"
              style={{ background: themes[themeColor].accent900 }}
            />
            <span>{t("text-page")}</span>
          </div>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {productData?.pages?.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <Link href={`/pages/${item.slug}`}>
                    <div className="relative cursor-pointer">
                      <div className="relative rounded-xl overflow-hidden">
                        <Image
                          src={
                            item?.imageObj?.url ?? "/product-placeholder.svg"
                          }
                          width="100%"
                          height="70%"
                          layout="responsive"
                          objectFit="cover"
                          alt={item?.name}
                          loader={({ src }) => {
                            return src;
                          }}
                        />
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"
                          style={{ background: "rgba(0, 0, 0, 0.34)" }}
                        />
                      </div>
                      <NameWrapper name={item?.name}></NameWrapper>
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        []
      )}
      <Modal open={!!image} onClose={() => setImage(null)}>
        <img
          style={{
            maxWidth: "80%",
            objectFit: "cover",
            margin: "auto",
            marginTop: "100px",
          }}
          src={image || ""}
        />
      </Modal>
    </div>
  );
};

export default ProductDetails;
