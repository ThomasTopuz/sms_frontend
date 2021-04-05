import React, { useState } from "react";
// reactstrap components
import { TabMenu } from 'primereact/tabmenu';
import { useHistory } from 'react-router-dom';
const items = [
  { label: 'School classes', icon: 'pi pi-fw pi-home', url: '/' },
  { label: 'Teachers', icon: 'pi pi-fw pi-calendar', url: 'teachers' },
  { label: 'Students', icon: 'pi pi-fw pi-pencil', url: 'students' }
];
const NavBar: React.FC<any> = () => {
  const [activeItem, setActiveItem] = useState(items[0]);
  const history = useHistory();
  return (
    <TabMenu model={items} activeItem={activeItem} onTabChange={(e) => {
      setActiveItem(e.value);
    }} />
  );
}
export default NavBar;
