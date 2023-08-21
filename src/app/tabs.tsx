import React, { useState } from 'react';
import styles from './tabs.module.scss'; // Import the module.scss file

interface Tab {
  title: string;
  component: React.ReactNode;
}

interface TabbedContainerProps {
  tabs: Tab[];
}

const TabbedContainer: React.FC<TabbedContainerProps> = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className={styles['tabbed-container']}>
      <div className={styles.tabs}>
        <h1>tellus</h1>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              activeTabIndex === index ? styles.active : ''
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className={styles['tab-content']}>
        {tabs[activeTabIndex]?.component}
      </div>
    </div>
  );
};

export default TabbedContainer;
