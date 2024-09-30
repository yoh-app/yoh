import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site.settings';
import { useSettings } from '@contexts/settings.context';
import { useUI } from "@contexts/ui.context";
const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({ className, page, displayHeaderSearch, ...props }) => {
  const { logo, siteTitle } = useSettings();

  const { displaySidebar, closeSidebar, sidebarView } = useUI();

  return (
    <Link onClick={closeSidebar} href="/" className={cn('inline-flex', className)} {...props}>
      {logo?.original || logo?.url ? (
        <span
          className="overflow-hidden relative"
          style={{
            width: siteSettings.logo.width,
            height: siteSettings.logo.height,
          }}
        >
          <Image src={logo?.original || logo?.url} alt={siteTitle} layout="fill" objectFit="contain" loading="eager" loader={({ src }) => { return src }} />
        </span>
      ) : (
        <span className={`${page?.navColor === 'white' && !displayHeaderSearch ? 'text-white' : 'text-black'} text-lg font-bold`}>{siteTitle?.charAt(0).toUpperCase()}</span>
      )}
    </Link>
  );
};

export default Logo;
