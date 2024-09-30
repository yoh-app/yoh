import Navbar from '@components/layout/navbar/navbar';
import dynamic from 'next/dynamic';
// const DynamicModalContainer = dynamic(() => import('@server/magic/components/Modal/ModalContainer'));

const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100">
    <Navbar />
    <div className="flex-grow">{children}</div>
    {/* <DynamicModalContainer /> */}
  </div>
);

export default Layout;
