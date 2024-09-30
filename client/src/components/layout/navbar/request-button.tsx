import Link from "next/link";
import { useSettings } from "@contexts/settings.context";
import { useRouter } from "next/router";
import { useWindowSize } from "@utils/use-window-size";
export default function RequestButton({
  page,
  displayHeaderSearch,
  hasRequests,
  isDefaultPage,
  locked,
  mode,
}) {
  const { indexPageSlug } = useSettings();
  const { query } = useRouter();
  let slug;
  switch (mode) {
    case "pages":
      slug = query?.pageSlug ?? indexPageSlug;
      break;
    case "videos":
      slug = query?.videoSlug ?? indexPageSlug;
      break;
    default:
      slug = indexPageSlug;
      break;
  }
  const size = useWindowSize();
  const isMobile = size.width < 768;

  let color = page?.navColor;
  if (isMobile) {
    if (displayHeaderSearch) {
      color = "black";
    }
  } else {
    if (displayHeaderSearch) {
      color = "black";
    }
    if (hasRequests) {
      color = "black";
    }
  }
  if (isDefaultPage || locked) {
    color = "black";
  }

  return (
    <Link href={`/${mode}/${slug}/request`}>
      <img
        className="cursor-pointer"
        width={32}
        src={color === "white" ? "/icons/hands_w.svg" : "/icons/hands_b.svg"}
      />
    </Link>
  );
}
