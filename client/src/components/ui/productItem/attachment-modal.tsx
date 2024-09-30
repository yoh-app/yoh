import { useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import ProductThumbnailGallery from "@components/ui/product/product-thumbnail-gallery";
import { useModalState } from "@components/ui/modal/modal.context";

export default function ProductAttachmentPopupDetails() {
  const { t } = useTranslation("common");
  const {
    data: { attachment },
  } = useModalState();

  useEffect(() => {
    console.log("attachment", attachment);
  }, [attachment]);
  return (
    <div className="flex max-w-full flex-col text-left bg-white xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center py-3 ltr:pl-4 ltr:pr-16 rtl:pr-4 rtl:pl-16 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2 className="truncate px-2.5 py-1 text-base font-medium md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pr-4 rtl:lg:pl-5 3xl:text-xl">
          {"Attachments"}
        </h2>
      </div>
      <div className="flex flex-col p-4 gap-4 md:p-6 md:flex-row md:min-w-[600px]">
        {attachment.attachmentType === "image" ? (
          <div className="relative pb-[calc(100%*9/16)] mb-4 w-full shrink-0 items-center justify-center overflow-hidden md:mb-6 lg:mb-auto lg:max-w-[480px] xl:flex xl:max-w-[570px] 2xl:max-w-[650px] 3xl:max-w-[795px]">
            <Image
              className="rounded-xl"
              src={attachment.imageObj?.url}
              alt={attachment.name}
              layout="fill"
              unoptimized={true}
              objectFit="contain"
            />
          </div>
        ) : (
          []
        )}
        {attachment.attachmentType === "audio" ? (
          <audio
            className="m-auto"
            controls
            src={attachment?.attachmentObj?.url}
          />
        ) : (
          []
        )}
        {attachment.attachmentType === "video" ? (
          <video
            className="m-auto"
            width="100%"
            controls
            src={attachment?.attachmentObj?.url}
          />
        ) : (
          []
        )}
      </div>
    </div>
  );
}
