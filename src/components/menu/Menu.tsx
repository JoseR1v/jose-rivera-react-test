import React, { useState } from 'react';
import styles from './Menu.module.scss'

interface Tab {
    name: string;
    content: React.ReactNode;
}

interface Props {
    tabs?: Tab[];
}

export const Menu: React.FC<Props> = ({ tabs = [
    { name: 'Default 1', content: <div>Contenido por defecto 1</div> },
    { name: 'Default 2', content: <div>Contenido por defecto 2</div> },
] }) => {
  // Verifica si tabs tiene al menos un elemento y usa el nombre del primer tab, de lo contrario usa un valor predeterminado.
  const initialSelectedContent = tabs.length > 0 ? tabs[0].name : 'Default 1';
  const [selectedContent, setSelectedContent] = useState<string>(initialSelectedContent);

  const handleButtonClick = (name: string) => {
    setSelectedContent(name);
  };

  return (
    <div>
        <div className={styles.tabContainer}>
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    onClick={() => handleButtonClick(tab.name)}
                    className={`${styles.tabButton} ${selectedContent === tab.name ? styles.tabButtonActive : styles.tabButtonInactive}`}
                >
                    <h3>
                        {tab.name}
                    </h3>
                </button>
            ))}
        </div>
        <div>
            {tabs.map(
                (tab) =>
                    selectedContent === tab.name && (
                        <div key={tab.name}>{tab.content}</div>
                    )
            )}
        </div>
    </div>
  );
};

export default Menu;
