import { Fragment, useRef, useEffect, useState, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import Link from 'client/src/components/ui/link';
import Link from 'next/link';
import cn from 'classnames';
// import Logo from 'client/src/components/ui/logo';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
// import { NavbarIcon } from 'client/src/components/icons/navbar-icon';
import { useQuery, gql } from '@apollo/client';
import processWebsite from 'client/src/process/website';
import { useFindUniqueWebsiteQuery, usePermissionQuery, useFindUniquePageQuery } from 'generated';
import { CraftContext } from '../CraftContext';
import { useTranslation } from 'next-i18next'
const NavbarWithSearch = ({ }) => {
  const { pathname, push, locale, query } = useRouter();
  const { websiteData, pageData, permissionData, setView, setNextPage } = useContext(CraftContext);
  const website = websiteData ? processWebsite(websiteData) : null;
  const { t } = useTranslation('admin')
  return (
    <div
      style={{ marginTop: '60px', position: 'absolute' }}
      className={cn(
        'bg-transparent w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 z-20 transition-transform duration-300'
        // {
        //   'fixed bg-transparent lg:absolute': pageData?.findUniquePage?.navColor === 'black',
        //   'is-sticky fixed bg-light shadow-sm': pageData?.findUniquePage?.navColor === 'white',
        // }
      )}
    >
      {/* <ul className="flex flex-grow md:flex-grow-0">
       <li>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {}}
            className="lg:hidden flex p-2 h-full items-center justify-center focus:outline-none focus:text-accent"
          >
            <NavbarIcon />
          </motion.button>
        </li>
        <li className="flex flex-grow align-items-center">
          <Logo className="mx-auto lg:mx-0" />
        </li> 
      </ul>*/}
      <img style={{ maxHeight: '30px', maxWidth: '30px' }} src={website?.logo?.original} />
      {/* <ul className="hidden pl-5 flex-grow lg:flex items-center flex-shrink-0 space-s-10"> */}
      {/* <ul className=" pl-5 flex-grow flex items-center flex-shrink-0 space-x-10">

        {website?.menu
          ?.filter(({ pages }) => pages?.length > 0)
          .map(({ pages, label }) => {
            if (pages?.length > 1) {
              return (
                <li>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center focus:outline-none">
                      <span
                        className={`${pageData?.navColor === 'white' ? 'text-white' : 'text-black'
                          } flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent`}
                      >
                        {label}
                      </span>
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
                        className="absolute py-4 mt-1 origin-top-right bg-white rounded shadow-md focus:outline-none"
                      >
                        {pages.map(({ href, label, id, isExternalLink, externalUrl }) => {
                          return (
                            <Menu.Item key={`${href}${label}`}>
                              {({ active }) => {
                                return (
                                  <li>
                                    <a
                                      href='#'
                                      onClick={() => {
                                        if (isExternalLink) {
                                          if (externalUrl) {
                                            window.location.assign(externalUrl)
                                          } else {
                                            alert(t('externalUrlNoSet'))
                                          }
                                        } else {
                                          setView('exit_design')
                                          setNextPage(`/admin/Website/Website/DesignPage?id=${id}`)
                                        }
                                      }}
                                      className={
                                        `${(id === query?.id || active) ? 'text-accent' : 'text-heading'} block w-full py-2.5 px-6 text-sm text-start font-semibold capitalize transition duration-200 hover:text-accent focus:outline-none whitespace-nowrap`
                                      }
                                    >
                                      {label}
                                    </a>
                                  </li>
                                )
                              }}
                            </Menu.Item>
                          )
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </li>
              );
            } else {
              return (
                <li key={`${pages[0].href}${pages[0].label}`}>
                  <a
                    href='#'
                    onClick={() => {
                      if (pages?.[0]?.isExternalLink) {
                        if (pages?.[0]?.externalUrl) {
                          window.location.assign(pages?.[0]?.externalUrl)
                        } else {
                          alert(t('externalUrlNoSet'))
                        }
                      } else {
                        setView('exit_design')
                        setNextPage(`/admin/Website/Website/DesignPage?id=${pages[0].id}`)
                      }
                    }}
                    className={`${query?.id === pages[0].id ? 'text-accent' : pageData?.navColor === 'white' ? 'text-white' : 'text-black'
                      } flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent`}
                  >
                    {label}
                  </a>
                </li>
              );
            }
          })}
      </ul> */}
    </div>
  );
};

export default NavbarWithSearch;
