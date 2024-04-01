import Link from 'next/link';
import classes from '../MainHeader.module.css';

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useRouter } from 'next/router';


interface SubmenuProps {
    index: number,
    title: string,
    links: { path: string, title: string }[],
    active: number | null,
    clicked: (i: number) => void
}

const Submenu = ({index, title, links, active,  clicked} : SubmenuProps) => {
    
    const router = useRouter();
    const submenuClasses = active === index ? classes.submenu +' '+classes['active'] : classes.submenu;

    return (
        <li onClick={() => clicked(index)}>
            <span>
                {title}
                {active === index ? <AiOutlineMinus /> : <AiOutlinePlus/>}
            </span>    
            <ul className={submenuClasses}>
                {links.map((link, index)=>{
                    return (
                        <li key={index}>
                            <Link 
                                href={link.path} 
                                className={router.asPath === link.path ? classes['active-link'] : ''}>
                                {link.title}
                            </Link>
                        </li>  
                    )
                })}
            </ul>
        </li>
    );
};

export default Submenu;