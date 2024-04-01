import Link from 'next/link';
import styled from 'styled-components';

const colWidth = 8.333333333333334;

export interface sizeObj  {
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
};
  
export const SectionTilte = styled.h2`
    font-size: 28px;
    margin-bottom: 16px;
    @media screen and (max-width: 768px) {
        font-size: 26px;
    }
`;

export const SectionWithBg = 
    styled.div<{ 
        $bgPath?: string, 
        $height?: { sm: number, md?: number, xl?: number}, 
        $fadeBoth?: boolean, 
        $fullBg?: boolean,
        $padding?: string,
        $margin?: string,
        $mobileFlexEnd?: boolean}>`
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        padding: ${props => props.$padding};
        margin: ${props => props.$margin};
        min-height: ${props => props?.$height?.sm}vh;
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: ${props => props.$fullBg ? '100' : '60'}%;
            background: url('${props => props.$bgPath}');
            background-size: cover;
            background-position: top center;
            background-repeat: no-repeat;
            z-index: -1;
            background-color: rgba(2,4,16,0.6);
        }
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: ${props => props.$fullBg ? '100' : '60'}%;
            z-index: -1;
            background-color: rgba(2,4,16,0.6);
            background:  ${props => !props.$fadeBoth ? 'linear-gradient( rgba(2,4,16, 0.4) 0%, rgba(2,4,16, 0.7) 33.3%, rgba(2,4,16, 0.8) 66.6%,rgb(2,4,16) 100%)' :
            'linear-gradient(180deg, rgba(2,4,16,1) 0%, rgba(2,4,16,0.8) 25%, rgba(2,4,16,0.7) 50%, rgba(2,4,16,0.8) 75%, rgba(2,4,16,1) 100%)'};  
        }
        ${props => props.$mobileFlexEnd && `
            @media screen and (max-width: 768px) {
                align-items: flex-end;
            }
        `}
        ${props => props?.$height?.md && `
            @media screen and (min-width: 641px) and (max-width: 1180px) {
                min-height: ${props.$height.md }vh;
            }`
        }
        ${props => props?.$height?.xl && `
            @media screen and (min-width: 1181px) {
                min-height: ${props.$height.xl }vh;
            }`}
        ${props => !props.$fullBg &&  `
            &:after,
            &:before {
                @media screen and (max-width: 640px) {
                    max-height: 400px;
                }`}
            }
            
    `;
      

SectionWithBg.defaultProps = {
    $height: { sm: 40 },
    $bgPath: '',
    $fadeBoth: false,
    $fullBg: true,
    $padding: '40px 0',
    $margin: '0',
    $mobileFlexEnd: false
};

export const MainContainer = styled.div`
    width: 100%;
	padding: 0 24px;
	max-width: 1280px;
	margin: 0 auto;
    
    @media screen and (min-width: 769px) {
        padding: 0 40px;
    }

    @media screen and (min-width: 1328px) {
        padding: 0;
    }
`;

export const Section = styled.div<{ $margin?: string }>`
    margin: ${props => props.$margin};
`;

Section.defaultProps = {
    $margin: '0 0 40px'
}

const getColSize = ( size: number = 100 ) : number => {
    const colSize = (colWidth * size);
    return colSize;
};
    
export const Row = styled.div<{ $gutter?: number,  $centerContent?: boolean }>`
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: ${props => props.$centerContent ? 'center' : 'flex-start'};
    margin: 0 -${props => props.$gutter}px;
    & > div {
        padding: 0 ${props => props.$gutter}px;
        margin-bottom: ${props => props.$gutter!*2}px;
    }`;

Row.defaultProps = {
    $gutter: 16,
    $centerContent: false
};
  
export const Column = styled.div<{ $size: sizeObj}>`
    width: 100%;
    box-sizing: border-box;
    
    @media screen and (max-width: 640px) {
      width: ${props => getColSize(props.$size.sm || 100)}%
    }
  
    @media screen and (min-width: 641px) and (max-width: 768px) {
      width: ${props => getColSize(props.$size.md || props.$size.sm || 100)}%
    }
  
    @media screen and (min-width: 769px) and (max-width: 1180px) {
      width: ${props => getColSize(
        props.$size.lg || 
        props.$size.md || 
        props.$size.sm || 
        100
      )}%
    }
  
    @media screen and (min-width: 1181px) {
      width: ${props => getColSize(
        props.$size.xl || 
        props.$size.lg || 
        props.$size.md || 
        props.$size.sm || 
        100
      )}%
    }
`;

const buttonStyle = (btnType: string = 'primary', opacityCta?: boolean, fontSize = 14) => `
    color: var(--white);
    background-color: var(--${btnType === 'primary' ? 'cta' : opacityCta ? 'secondaryCtaOpacity' : 'secondaryCta'});
    padding: 6px 16px;
    border-radius: 6px;
    font-weight: 500;
    text-align: center;
    font-size: ${fontSize}px;
    margin-bottom: 16px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: background-color .25s ease;
    &:hover {
        background-color: var(--${btnType === 'primary' ? 'ctaHover' : opacityCta ? 'secondaryCtaOpacityHover' : 'secondaryCtaHover'});
    }
    span {
        color: inherit;
        font-size: inherit;
    }
    svg {
        display: inline-block;
        vertical-align: sub;
        &:not(:only-child) {
            &:first-child {
                margin-right: 8px;
            }
            &:last-child {
                margin-left: 8px;
            }
        } 
    }`;


export const Button = styled.button<{ 
    $btnType?: 'primary' | 'secondary', 
    $opacityCta?: boolean, $fontSize?: number }>`
   ${props => buttonStyle(props.$btnType, props.$opacityCta, props.$fontSize)}
`;

export const LinkButton = styled(Link)<{ $btnType?: 'primary' | 'secondary', 
$opacityCta?:boolean, $fontSize?: number }>`
    ${props => buttonStyle(props.$btnType, props.$opacityCta, props.$fontSize)}
    display: inline-block;
`;

export const PageTopNav = styled.div`
    display: flex;
    margin: 0 -4px;
    margin-bottom: 40px;
    > ${Button} {
        margin: 0 4px;
        @media screen and (max-width: 640px) {
            width: 50%;
        }
    }
`;

export const Poster = styled.div<{ $imgPath?: string}>`
    position: relative;
    max-width: 600px;
    background-image: url('${props => props.$imgPath}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 8px;
    overflow: hidden;
    &:after {
        content: '';
        display: block;
        padding-bottom: 146.6%;
    }
`;

Poster.defaultProps = {
    $imgPath: ''
};

export const DetailsWrapper = styled.div`
    h1 {
        margin-bottom: 16px;
    }
    > span, p, div {
        margin-bottom: 16px;
    }
    blockquote {
        color: var(--gray);
        margin: 16px 0;
    }
    > * {
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

export const TrailerWrapper = styled.div<{ $margin?: string }>`
    position: relative;
    padding-bottom: 56.25%;
    margin: ${props => props.$margin ? props.$margin : '0'};
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border: 0;
    }
    img {
       border-radius: 8px;
    }
`;

