import NextLink from 'next/link';

// export interface LinkProps extends NextLinkProps {
//   className?: string;
// }

const Link = ({ href, children, className, ...props }) => {
  return (
    <NextLink href={href}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
