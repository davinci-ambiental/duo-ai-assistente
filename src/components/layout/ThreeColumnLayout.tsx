
import React from 'react';

type ThreeColumnLayoutProps = {
  leftSidebar: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar: React.ReactNode;
};

const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  leftSidebar,
  mainContent,
  rightSidebar,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
      <div className="md:col-span-3 lg:col-span-2">
        {leftSidebar}
      </div>
      <div className="md:col-span-6 lg:col-span-8">
        {mainContent}
      </div>
      <div className="md:col-span-3 lg:col-span-2">
        {rightSidebar}
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
