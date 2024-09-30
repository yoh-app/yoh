import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";

export default function ProductQRCodePopupDetails() {
  const [imageList, setImageList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setImageList(Array(6).fill(1).map((_, _index) => {
      return {
        id: _index + 1
      }
    }))
  }, [])
  return (
    <div className="flex max-w-full flex-col bg-white text-left xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center py-3 ltr:pl-4 ltr:pr-16 rtl:pr-4 rtl:pl-16 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2 className="truncate px-2.5 py-1 text-base font-medium md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pr-4 rtl:lg:pl-5 3xl:text-xl">
          {'QR Code'}
        </h2>
      </div>
      <div className="flex flex-col p-4 gap-4 md:p-6 items-center md:min-w-[600px]">
        <div className="text-center">
          To Distributors of this GEM: <br />
          Scan this QR code to Redeem
        </div>
        <div className="p-8 rounded-3xl">
          <QRCode
            size={240}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={'https://www.google.com/'}
            viewBox={`0 0 192 192`}
          />
        </div>
      </div>
    </div>
  );
}
