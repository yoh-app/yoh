import Link from 'next/link';
import { useWindowSize } from '@utils/use-window-size'

export default function SearchButton({ page, displayHeaderSearch, hasRequests, isDefaultPage, locked }) {
  let color = page?.navColor
  const size = useWindowSize();
  const isMobile = size.width < 768;
  if (isMobile) {
    if (displayHeaderSearch) {
      color = 'black'
    }
  } else {
    if (displayHeaderSearch) {
      color = 'black'
    }
    if (hasRequests) {
      color = 'black'
    }
  }
  if (isDefaultPage || locked) {
    color = 'black'
  }
  return (
    <Link href={`/search`}>
      <img className="cursor-pointer" width={18} src={color === 'white' ? "/icons/search_w.svg" : "/icons/search_b.svg"} />
    </Link>
  );
}
