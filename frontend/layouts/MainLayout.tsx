import React from 'react';
import { Footer, Header } from '../components';

interface MainLayoutProps {
  children: React.ReactChild | React.ReactNode;
  showFooter?: boolean;
  headerVariant?: 'default' | 'transparent' | 'chapter';

}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showFooter = true,
  headerVariant = 'default',
}) => {
  return (
    <>
      <Header variant={headerVariant} />
      <div className='wrapper'>{children}</div>
      {showFooter && <Footer />}
    </>
  );
};

export default MainLayout;
