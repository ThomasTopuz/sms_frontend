import React, {useState} from "react";
// reactstrap components
import {TabMenu} from 'primereact/tabmenu';
import {useHistory} from 'react-router-dom';

const items = [
    {label: '', icon: 'pi pi-fw pi-home', target: '/'},
    {label: 'Teachers', icon: 'pi pi-fw pi-calendar', target: '/teachers'},
    {label: 'Students', icon: 'pi pi-fw pi-pencil', target: '/students'}
];
const NavBar: React.FC<any> = () => {
    const [activeItem, setActiveItem] = useState(items[0]);
    const history = useHistory();
    return (
        <TabMenu className="p-1" model={items} activeItem={activeItem} onTabChange={(e) => {
            setActiveItem(e.value);
            history.push(e.value.target);
        }}/>
    );
}
export default NavBar;
