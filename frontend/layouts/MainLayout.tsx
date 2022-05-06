import React from 'react';
import { Footer, Header } from '../components';

interface MainLayoutProps {
  children: React.ReactChild | React.ReactNode;
  showFooter?: boolean;
  bgTranparent?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showFooter = true,
  bgTranparent = false,
}) => {
  return (
    <>
      <Header bgTranparent={bgTranparent} />
      <>{children}</>
      {showFooter && <Footer />}
    </>
  );
};

export default MainLayout;
