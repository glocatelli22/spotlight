import { Button, Column, Row, MainContainer, SectionWithBg, Section } from "@/components/layout-components";
import { useState } from "react";
import { AiOutlineQuestion, AiOutlineRedo } from "react-icons/ai";
import classes from "@/styles/Homepage.module.css";
import Score from "@/components/misc/Score/Score";

const Roulette = () => {

    const [spinning, setSpinning] = useState(false);
    
    const spinHandler = () => {
        setSpinning(true);
    };

    return <SectionWithBg 
        $margin="60px 0 0" 
        $bgPath="/roulette.jpg" 
        $fadeBoth={true}>
        <MainContainer>
            <Row $gutter={20} className={`${classes['hp-roulette']} ${spinning ? classes['spinning'] : ''}`}>
                <Column $size={{sm: 12, lg: 6}}> 
                    <h3 className="secondary-color">film roulette</h3>
                    <h2>
                        Non sai cosa guardare?<br/>
                        Fatti sorprendere da un film a caso.
                    </h2>
                    <Button 
                        $fontSize={16}
                        onClick={spinHandler}>
                        <span>Spin</span>
                        <AiOutlineRedo size={18}/>
                    </Button>
                </Column>
                <Column 
                    $size={{sm: 12, lg: 6}}>
                    <Row $gutter={12}>
                        <Column $size={{sm: 6, lg: 5,  xl: 4}}> 
                            {spinning && 
                                <div className={classes['roulette-card']}>
                                    <AiOutlineQuestion size={100}/>   
                                    <span></span>
                                </div>
                            }     
                        </Column>
                        <Column $size={{sm: 6, lg: 7,  xl: 8}}> 
                            {spinning ? 
                                <span>Cercando un film a caso</span>: 
                                <div>
                                    <h3>un film a caso</h3>
                                    <div className="secondary-color">
                                        <Score vote={4} />
                                    </div>
                                    <Button $btnType="secondary">Scopri di più</Button>
                                </div>
                            }
                        </Column>
                    </Row>
                </Column>
            </Row>
        </MainContainer>
    </SectionWithBg>
};

export default Roulette;