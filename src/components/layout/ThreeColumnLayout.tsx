
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

type ThreeColumnLayoutProps = {
  leftSidebar: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar?: React.ReactNode; // Make rightSidebar optional
};

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  leftSidebar,
  mainContent,
  rightSidebar,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 lg:gap-5 w-full max-w-full overflow-hidden">
      {/* Left sidebar */}
      <div className="md:col-span-3 lg:col-span-2 w-full">
        <div className="h-full overflow-hidden">
          {leftSidebar}
        </div>
      </div>
      
      {/* Main content - expands when no right sidebar */}
      <div className={`md:col-span-${rightSidebar ? '6 lg:col-span-7' : '9 lg:col-span-10'} w-full`}>
        <div className="h-full overflow-hidden">
          {mainContent}
        </div>
      </div>
      
      {/* Optional right sidebar */}
      {rightSidebar && (
        <div className="md:col-span-3 lg:col-span-3 w-full">
          <div className="h-full overflow-hidden">
            {rightSidebar}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeColumnLayout;
