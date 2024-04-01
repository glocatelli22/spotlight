import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import classes from "@/styles/NotFoundPage.module.css";
import {
    Column, 
    MainContainer, 
    SectionWithBg, 
    Row, 
    Button } from "@/components/layout-components";

const NotFoundPage = () => {

    const router = useRouter();

    return <SectionWithBg 
        className={classes['page-404']}
        $height={{ sm: 70}} 
        $bgPath={'/404.jpg'}
        $padding="110px 0 0"
        $fadeBoth={true}
        $margin="-72.9px 0 80px">
        <MainContainer>
            <Row>
                <Column $size={{sm: 12, md: 9, lg: 7, xl: 5}}>
                    <h1>Ops... <br /> Non abbiamo trovato quello che stavi cercando</h1>
                    <Button onClick={() => router.push('/')} $fontSize={16}>
                        <AiOutlineHome size={20} /> <span>Torna alla home</span>
                    </Button>
                </Column>
            </Row>
        </MainContainer>
    </SectionWithBg>
};

export default NotFoundPage;