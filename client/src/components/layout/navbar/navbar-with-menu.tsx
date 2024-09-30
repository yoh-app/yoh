import { Fragment, useRef, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
// import Link from '@components/ui/link';
import Link from "next/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import LanguageMenu from "@components/layout/navbar/language-menu";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { useTypesQuery } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import { useSettings } from "@contexts/settings.context";
import { Waypoint } from "react-waypoint";
import SearchButton from "@components/layout/navbar/search-button";
import RequestButton from "@components/layout/navbar/request-button";
import CartButton from "@components/layout/navbar/cart-button";
import { motion } from "framer-motion";
import { NavbarIcon } from "@components/icons/navbar-icon";
import {
  useStripeEnabledQuery,
  useFindManyWebsiteQuery,
  usePermissionQuery,
} from "@generated";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNetwork, useSwitchNetwork, useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCustomer } from "@contexts/customer.context";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

type Props = {
  hideTypeMenu?: boolean;
};
const defaultPages = [
  "/search",
  "/requests",
  "/request",
  "/nft",
  "/login",
  "/logout",
  "/products",
  "/orders",
];

const NavbarWithSearch: React.FC<Props> = ({ hideTypeMenu = false, page }) => {
  if (typeof window === "undefined") {
    return null;
  }
  const { t } = useTranslation("common");
  const website = useSettings();
  console.log("website:", website);
  const { pathname, push, locale, query } = useRouter();
  const { hasRequests, locked } = useSettings();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const { customer } = useCustomer();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { closeModal, openModal } = useModalAction();

  const navbarRef = useRef() as DivElementRef;

  const { data: permissionData, refetch } = usePermissionQuery();
  // const { data: stripeEnabledData } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: website.slug
  //   },
  //   skip: website?.paymentMethod !== 'stripe'
  // })
  const isAuthorized = permissionData?.permission?.admin !== "Public";

  useEffect(() => {
    if (pathname) {
      refetch();
    }
  }, [pathname]);

  const {
    openSidebar,
    setSidebarView,
    isAuthorize,
    displayHeaderSearch,
    displayMobileSearch,
  } = useUI();
  const { showHeaderSearch, hideHeaderSearch } = useUI();

  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showHeaderSearch();
    }
  };
  function handleSidebar(view: string) {
    setSidebarView(view);
    return openSidebar();
  }

  const handleResize = (event: Event) => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isDefaultPage = defaultPages.find((page) => pathname.includes(page));
  return (
    <>
      <Waypoint
        onLeave={showHeaderSearch}
        onEnter={hideHeaderSearch}
        onPositionChange={onWaypointPositionChange}
      />
      <header ref={navbarRef} className="site-header-with-search h-auto">
        <nav
          className={cn(
            "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 end-0 z-20 transition-transform duration-300",
            {
              "fixed bg-transparent lg:absolute": !displayHeaderSearch,
              "is-sticky fixed bg-white shadow-sm": displayHeaderSearch,
            }
          )}
        >
          <ul className="flex flex-grow md:flex-grow-0">
            <li>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => handleSidebar("MAIN_MENU_VIEW")}
                className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
              >
                <span className="sr-only">{t("text-burger-menu")}</span>
                <NavbarIcon
                  color={
                    page?.navColor === "white" &&
                    !displayHeaderSearch &&
                    !isDefaultPage &&
                    !locked
                      ? "white"
                      : "black"
                  }
                />
              </motion.button>
            </li>
            <li className="flex flex-grow align-items-center">
              <Logo
                displayHeaderSearch={displayHeaderSearch}
                page={page}
                className="mx-auto lg:mx-0"
              />
            </li>
          </ul>
          {/* {(website?.walletAddress && customer?.id) && <div className='mx-3'><ConnectButton /></div>} */}

          {/* <ul className="hidden pl-5 flex-grow lg:flex items-center flex-shrink-0 space-x-8">
            {website?.menu
              ?.filter(({ pages }) => pages?.length > 0)
              .map(({ pages, label }) => {
                if (pages?.length > 1) {
                  return (
                    <li>
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className={`flex items-center focus:outline-none`}>
                          <span className={`${page?.navColor === 'white' && !displayHeaderSearch && !isDefaultPage && !locked ? 'text-white' : 'text-black'} flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent`}>{label}</span>
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
                            className="absolute w-48 py-4 mt-1 origin-top-right bg-white rounded shadow-700 focus:outline-none shadow-md"
                          >
                            {pages.map(({ href, label, slug }) => (
                              <Menu.Item key={`${href}${label}`}>
                                {({ active }) => (
                                  <li>
                                    <Link
                                      href={href}
                                    >
                                      <a
                                        className={
                                          `${(active || query?.pageSlug === slug) ? 'text-accent' : 'text-heading'} block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none`
                                        }>
                                        {t(label)}
                                      </a>
                                    </Link>
                                  </li>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </li>
                  );
                } else {
                  return (
                    <li key={`${pages[0].href}${pages[0].label}`}>

                      <Link
                        href={pages[0].href}
                      >
                        <a className={`${query?.pageSlug === pages[0]?.slug && !!query?.pageSlug && !!pages[0]?.slug ? 'text-accent' : page?.navColor === 'white' && !displayHeaderSearch && !isDefaultPage && !locked ? 'text-white' : 'text-black'
                          } flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent`}>
                          {label}
                        </a>
                      </Link>
                    </li>
                  );
                }
              })}
          </ul> */}
          <ul className="flex items-center flex-shrink-0 space-x-8">
            {/*isAuthorize ? (
              <li key="track-orders">
                <Link
                  href={ROUTES.ORDERS}
                  className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                >
                  {t('nav-menu-track-order')}
                </Link>
              </li>
            ) : null*/}
            {/* {siteSettings.headerLinks.map(({ href, icon, label }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {icon && <span className="me-2">{icon}</span>}
                    {t(label)}
                  </Link>
                </li>
              ))} */}
            {/* {innerWidth >= 959 ? (
              <li>
                <LanguageMenu />
              </li>
            ) : (
              []
            )} */}
            {/* {(innerWidth >= 959 && address) && <Link href='/nft'><a className={page?.navColor === 'white' && !displayHeaderSearch && !isDefaultPage && !locked && !hasRequests ? 'text-white' : 'text-black'}>NFT</a></Link>} */}
            {isAuthorized && website?.walletAddress ? (
              <>
                {pathname.indexOf('[productSlug]') < 0 && (
                  <li>
                    <RequestButton
                      locked={locked}
                      isDefaultPage={isDefaultPage}
                      hasRequests={hasRequests}
                      displayHeaderSearch={displayHeaderSearch}
                      page={page}
                      mode={pathname.indexOf('[videoSlug]') >= 0 ? "videos" : "pages"}
                    />
                  </li>
                )}
                {/* <li>
                  <CartButton />
                </li> */}
              </>
            ) : (
              []
            )}
            {innerWidth >= 959 ? (
              <li>
                <SearchButton
                  locked={locked}
                  isDefaultPage={isDefaultPage}
                  hasRequests={hasRequests}
                  displayHeaderSearch={displayHeaderSearch}
                  page={page}
                />
              </li>
            ) : (
              []
            )}
            {isAuthorized ? (
              <>
                <li>
                  <AuthorizedMenu />
                </li>
              </>
            ) : (
              <li>
                {/* <button
                  onClick={() => openModal('LOGIN_VIEW')}
                  className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
                >
                  {t('text-login')}
                </button> */}
                <JoinButton />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavbarWithSearch;
