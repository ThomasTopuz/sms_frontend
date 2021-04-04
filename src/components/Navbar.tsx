import React, {useState} from "react";
// reactstrap components
import { TabMenu } from 'primereact/tabmenu';
const items = [
  {label: 'School classes', icon: 'pi pi-fw pi-home'},
  {label: 'Teachers', icon: 'pi pi-fw pi-calendar'},
  {label: 'Students', icon: 'pi pi-fw pi-pencil'}
];
const NavBar: React.FC<any> = () => {
  const [activeItem, setActiveItem] = useState(items[0]);
  return (
      <TabMenu model={items} activeItem={activeItem} onTabChange={(e) => setActiveItem(e.value)}/>
  );
}
export default NavBar;
