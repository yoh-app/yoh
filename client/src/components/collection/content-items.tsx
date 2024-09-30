import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface ContnetItemsProps {
  list: Array<any>;
  type?: 'link' | 'audio' | 'video';
}

const ContnetItems: React.FC<ContnetItemsProps> = ({
  list = [],
  type = 'link'
}) => {
  const { t } = useTranslation('common');

  return list.length ?
    (
      <>
        {
          list.map((item: Record<string, any>) => {
            return (
              <div key={item.id} className="item-block w-full flex items-center py-4 border-gray-400">
                <div className="flex justify-center rounded-xl overflow-hidden">
                  <Image
                    src={item.imageObj?.url! ?? '/product-placeholder.svg'}
                    alt={item.name}
                    layout="fixed"
                    width={60}
                    height={60}
                    className="product-image"
                  />
                </div>
                <div className="ml-4">
                  <div className="m-1 inline-flex items-center justify-center text-gray-400">
                    <img className="cursor-pointer" width={10} src={`/icons/tag_${type}.png`} />
                    <span className="ml-2 text-sm" style={{ color: "#637381" }}>{t(`text-${type}`)}</span>
                  </div>
                  <div>
                    {item.description}
                  </div>
                </div>
              </div>
            )
          })
        }
      </>
    ) : (
      <></>
    )
}

export default ContnetItems;