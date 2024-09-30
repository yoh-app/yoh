import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site.settings';
import SidebarWrapper from '@components/common/sidebar/sidebar-wrapper';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@contexts/settings.context';
import { useFindManyWebsiteQuery } from '@generated';
import Link from 'next/link'
export default function MobileAuthorizedMenu() {
  const { t } = useTranslation('common');
  const { slug } = useSettings();
  const { data: websiteData } = useFindManyWebsiteQuery({
    variables: {
      where: {
        slug: {
          equals: slug
        }
      }
    },
    skip: !slug
  })

  const website = websiteData?.findManyWebsite?.[0]

  // const { data: stripeEnabledData } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: slug,
  //   },
  //   skip: !slug,
  // });
  const router = useRouter();
  const { closeSidebar } = useUI();
  // function handleClick(path: string) {
  //   router.push(path);
  //   return closeSidebar();
  // }
  return (
    <SidebarWrapper>
      <ul className="flex-grow">
        {[
          ...(website?.walletAddress ? siteSettings.paymentEnabledLinks : []),
          ...siteSettings.authorizedLinks,
        ].map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              href={href}
            >
              <a className="block py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent"
              >{t(label)}</a>

            </Link>
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
}
