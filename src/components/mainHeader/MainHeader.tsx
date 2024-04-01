import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './MainHeader.module.css';
import Submenu from './Submenu/Submenu';
import { VscMenu, VscArrowRight} from 'react-icons/vsc';
import Link from 'next/link';
import { submenuList } from '@/utils/misc';
import SearchForm from '../misc/Search';
import Logo from '../layout-components/Logo';


const MainHeader = ({ handleNavDisplay, additionalClass, displayNav } : { handleNavDisplay: () => void, additionalClass: string, displayNav: boolean }) => {
   
    const router = useRouter();
    
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    
    const handleSubmenu = (index: number) => {
        setActiveSubmenu((prevIndex : number | null)=>{
            return prevIndex === index ? null : index;
        });
    };
    
    useEffect(() => {
       
        const subMenuHasActiveLink = submenuList.findIndex(sbmObject => {
            return sbmObject.subMenuLinks.findIndex(link => link.path === router.asPath) >= 0;
        });
        setActiveSubmenu(displayNav && subMenuHasActiveLink >= 0 ? subMenuHasActiveLink : null);
        
    }, [displayNav, router.asPath]);

    return (
        <Fragment>
            <header className={`${classes["main-header"]} ${additionalClass}`}>
                <Logo />
                <div className={classes["main-header__nav-icons"]}>
                    <SearchForm />
                    <div className={classes.hamburger} onClick={handleNavDisplay}>
                        <VscMenu />
                    </div>
                </div>
            </header>    
           
            <nav className={`${classes["nav-stack"]} ${additionalClass}`}>
                <div className={classes.close} onClick={handleNavDisplay}>
                    <VscArrowRight />
                </div>
                <ul className={classes.menu}>
                    <li>
                        <Link href="/" className={router.asPath === '/' ? classes['active-link'] : ''}>Homepage</Link>
                    </li>
                    {submenuList.map((subMn, index) => {
                        return (
                            <Submenu key={index} index={index} title={subMn.title} links={subMn.subMenuLinks} active={activeSubmenu} clicked={handleSubmenu}/>
                        )
                    })}
                </ul>
            </nav>
            
        </Fragment>
       
        
    );
};

export default MainHeader;

