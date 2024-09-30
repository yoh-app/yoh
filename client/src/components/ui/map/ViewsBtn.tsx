import { useState } from 'react';
import Image from '@components/ui/image';
import fetus from '@assets/map/fetus.png'
import god from '@assets/map/god.png'
import { useTranslation } from 'next-i18next';

export default function MapViewsButton() {
  const [view, setView] = useState<string>('fetus'); // fetus, god
  // const queryClient = useQueryClient();
  // const { isAuthorized, isLoading, me } = useMe();
  // const { data: isShopFollowed, isLoading: isFollowLoading } = useQuery(
  //   [API_ENDPOINTS.FOLLOW_SHOP, shop_id],
  //   () => client.follow.isShopFollowed({ shop_id }),
  //   {
  //     enabled: isAuthorized,
  //   }
  // );

  // const { mutate: toggleFollow } = useMutation(client.follow.toggle, {
  //   onSettled: () => {
  //     queryClient.invalidateQueries([API_ENDPOINTS.FOLLOW_SHOP, shop_id]);
  //     queryClient.invalidateQueries([API_ENDPOINTS.FOLLOWED_SHOPS]);
  //   },
  // });

  function handleToggleView() {
    setView(view === 'fetus' ? 'god' : 'fetus')
    // toggleFollow({
    //   shop_id,
    // });
  }
  const { t } = useTranslation('common');
  return (
    <>
      <div
        onClick={handleToggleView}
        className={`md:none flex items-center justify-center w-[140px] h-[48px] text-[16px] text-white dark:text-white rounded-full cursor-pointer ${view === 'fetus' ? 'bg-purple' : 'bg-aqua'
          }`}
      >
        {
          view === 'fetus' ? <Image
            alt="fetus"
            quality={100}
            src={fetus}
            width={18}
            height={18}
            className="object-cover w-[18px] h-[18px] mr-[5px]"
          /> : <Image
            alt="god"
            quality={100}
            src={god}
            width={18}
            height={18}
            className="object-cover w-[18px] h-[18px] mr-[5px]"
          />
        }
        {
          view === 'fetus' ? 'Fetus View' : 'God View'
        }
      </div>
    </>
  );
}
