import React, { useEffect, useState } from "react";


type ReactChildren = { children: React.ReactNode};

import { Work_Sans } from "next/font/google";
import MainHeader from "./mainHeader/MainHeader";
import OffCanvasWrapper from "./layout-components/OffCanvasWrapper";
import Footer from "./footer/Footer";
import { useRouter } from "next/router";

const font = Work_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '800'],
});

const Layout = ({ children } : ReactChildren) => {
    
    const [displayNav, setDisplayNav] = useState<boolean>(false);
    const handleNavDisplay = () => setDisplayNav(prevState => !prevState);

    const { query } = useRouter();
    
    useEffect(() => {
        setDisplayNav(false);
    }, [query]);

    return (   
        <OffCanvasWrapper displayNav={displayNav} handleNavDisplay={handleNavDisplay}>
            <MainHeader displayNav={displayNav} additionalClass={font.className} handleNavDisplay={handleNavDisplay}/>
            <main className={font.className}>
                {children}
            </main>
            <Footer />
        </OffCanvasWrapper> 
    );
};

export default Layout;