import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { siteSettings } from '@settings/site.settings';
import Avatar from '@components/ui/avatar';
// import { useCustomerQuery } from "@graphql/auth.graphql";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useSettings } from '@contexts/settings.context';
import { useStripeEnabledQuery } from '@generated';
import { useFindManyWebsiteQuery } from '@generated';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { sequence } from '0xsequence'

export default function AuthorizedMenu() {
  const data = {};
  // const { data } = useCustomerQuery({ onError: () => {} });
  const router = useRouter();
  const { t } = useTranslation('common');
  const { slug } = useSettings();
  const openWallet = () => {
    const wallet = sequence.getWallet()
    wallet.openWallet()
  }
  const { data: websiteData } = useFindManyWebsiteQuery({
    variables: {
      where: {
        slug: {
          equals: slug
        },
        active: {
          equals: true
        }
      }
    },
    skip: !slug
  })
  const website = websiteData?.findManyWebsite?.[0]
  // const { data: stripeEnabledData } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: slug
  //   },
  //   skip: website?.paymentMethod !== 'stripe'
  // })
  // const { data: stripeEnabledData } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: slug,
  //   },
  //   skip: !slug,
  // });
  function handleClick(path: string) {
    router.push(path);
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center focus:outline-none">
        <Avatar src={data?.me?.profile?.avatar?.thumbnail ?? '/avatar-placeholder.svg'} title="user name" />
        <span className="sr-only">{t('user-avatar')}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute right-0 w-48 py-4 mt-1 origin-top-right bg-white rounded shadow-md focus:outline-none"
        >
          {/* <ConnectButton /> */}
          <Menu.Item key={`sequence`}>
            <li>
              <button className={cn(
                'block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none',
              )} onClick={openWallet}>Sequence Wallet</button>
            </li>
          </Menu.Item>
          {[
            // ...((website?.paymentMethod === 'crypto' ? website?.walletAddress : stripeEnabledData?.stripeEnabled) ? siteSettings.paymentEnabledLinks : []),
            // ...siteSettings.authorizedLinks,
            ...(website?.walletAddress ? siteSettings.paymentEnabledLinks : []),
            ...siteSettings.authorizedLinks,
          ].map(({ href, label }) => (
            <Menu.Item key={`${href}${label}`}>
              {({ active }) => (
                <li>
                  <button
                    onClick={() => handleClick(href.replace('{locale}', router.locale))}
                    className={cn(
                      'block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize text-heading transition duration-200 hover:text-accent focus:outline-none',
                      active ? 'text-accent' : 'text-heading',
                    )}
                  >
                    {t(label)}
                  </button>
                </li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
