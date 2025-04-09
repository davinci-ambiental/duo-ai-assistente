
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-2">
        {leftSidebar}
      </div>
      <div className="lg:col-span-8">
        {mainContent}
      </div>
      <div className="lg:col-span-2">
        {rightSidebar}
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
