import {defaultHeight, defaultWidth, IconType} from "./icons";

export const RuIcon: IconType = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width={props.width ?? defaultWidth}
             height={props.height ?? defaultHeight}>
            <rect fill="#fff" width="9" height="3"/>
            <rect fill="#d52b1e" y="3" width="9" height="3"/>
            <rect fill="#0039a6" y="2" width="9" height="2"/>
        </svg>
    );
};

export const UKIcon: IconType = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width={props.width ?? defaultWidth}
             height={props.height ?? defaultHeight}>
            <clipPath id="s">
                <path d="M0,0 v30 h60 v-30 z"/>
            </clipPath>
            <clipPath id="t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <g clipPath="url(#s)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
        </svg>
    );
};
