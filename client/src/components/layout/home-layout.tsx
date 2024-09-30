import NavbarWithMenu from '@components/layout/navbar/navbar-with-menu';
import dynamic from 'next/dynamic';
// const DynamicModalContainer = dynamic(() => import('@server/magic/components/Modal/ModalContainer'));

const HomeLayout: React.FC = ({ children, page }) => (
  <div className="flex flex-col transition-colors duration-150">
    <NavbarWithMenu page={page} />
    {children}
    {/* <DynamicModalContainer /> */}
  </div>
);

export default HomeLayout;
