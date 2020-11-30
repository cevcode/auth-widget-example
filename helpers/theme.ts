import {
    PositionTypes,
    FontSizeTypes,
    WeightTypes,
    ComponentSizesTypes,
    DirectionTypes,
    JustifyContentTypes,
    AlignItemsTypes,
    AlignTextTypes,
} from './enums';
import { createGlobalStyle } from 'styled-components';
import bgImage from 'assets/bg.png';

export const globalStyles = {
    global: {
        borderRadius: 5,
        componentHeight: 40,
    },
    fonts: {
        default: `
            font-family: 'Cairo', sans-serif
       `,
    },

    jc: {
        flexStart: `
            justify-content: flex-start;
        `,
        center: `
            justify-content: center;
        `,
        stretch: `
            justify-content: stretch;
        `,
        flexEnd: `
            justify-content: flex-end;
        `,
        spaceBetween: `
            justify-content: space-between;
        `,
        spaceAround: `
            justify-content: space-around;
        `,
        default: `
            justify-content: flex-start;
        `,
    },

    ai: {
        flexStart: `
            align-items: flex-start;
        `,
        center: `
            align-items: center;
        `,
        stretch: `
            align-items: stretch;
        `,
        flexEnd: `
            align-items: flex-end;
        `,
        spaceBetween: `
            align-items: space-between;
        `,
        spaceAround: `
            align-items: space-around;
        `,
        default: `
            align-items: flex-start;
        `,
    },

    textAlign: {
        center: `
            text-align: center;
        `,
        left: `
            text-align: left;
        `,
        right: `
            text-align: right;
        `,
        default: `
            text-align: left;
        `,
    },

    direction: {
        row: `
            flex-direction: row;
        `,
        column: `
            flex-direction: column;
        `,
        default: `
            flex-direction: column;
        `,
    },

    position: {
        left: `
            justify-content: left;
        `,
        right: `
            justify-content: right;
        `,
        center: `
            justify-content: center;
        `,
        default: `
            justify-content: left;
        `,
    },

    componentSizes: {
        s: `
            width: 120px;
        `,
        m: `
            width: 240px;
        `,
        l: `
            width: 320px;
        `,
        xl: `
            width: 420px;
        `,
        full: `
            width: 100%;
        `,
        auto: `
            width: auto;
        `,
        default: `
            width: 180px;
        `,
    },

    weight: {
        400: `
            font-weight: 400;
        `,
        500: `
            font-weight: 500;
        `,
        600: `
            font-weight: 600;
        `,
        700: `
            font-weight: 700;
        `,
        800: `
            font-weight: 800;
        `,
        default: `
            font-weight: 400;
        `,
    },

    fontSizes: {
        xs: `
            font-size: 12px;
        `,
        s: `
            font-size: 14px;
        `,
        m: `
            font-size: 18px;
        `,
        l: `
            font-size: 24px;
        `,
        xl: `
            font-size: 36px;
        `,
        xxl: `
            font-size: 48px;
        `,
        default: `
            font-size: 16px;
        `,
    },
};

export const space = (props: any) => ({
    margin: props.margin || '',
    marginBottom: props.mbottom || '',
    marginTop: props.mtop || '',
    marginLeft: props.mleft || '',
    marginRight: props.mright || '',
    padding: props.padding || '',
    paddingBottom: props.pbottom || '',
    paddingTop: props.ptop || '',
    paddingLeft: props.pleft || '',
    paddingRight: props.pright || '',
});

export const weight = (props: { weight?: WeightTypes }) => {
    if (props.weight) {
        return globalStyles.weight[props.weight];
    }
    return globalStyles.weight.default;
};

export const fontSize = (props: { fontSize?: FontSizeTypes }) => {
    if (props.fontSize) {
        return globalStyles.fontSizes[props.fontSize];
    }
    return globalStyles.fontSizes.default;
};

export const align = (props: { position?: PositionTypes }) => {
    if (props.position) {
        return globalStyles.position[props.position];
    }
    return globalStyles.position.default;
};

export const componentSize = (props: { componentSize?: ComponentSizesTypes }) => {
    if (props.componentSize) {
        return globalStyles.componentSizes[props.componentSize];
    }
    return globalStyles.componentSizes.default;
};

export const direction = (props: { direction?: DirectionTypes }) => {
    if (props.direction) {
        return globalStyles.direction[props.direction];
    }
    return globalStyles.direction.default;
};

export const jc = (props: { jc?: JustifyContentTypes }) => {
    if (props.jc) {
        return globalStyles.jc[props.jc];
    }
    return globalStyles.jc.default;
};

export const ai = (props: { ai?: AlignItemsTypes }) => {
    if (props.ai) {
        return globalStyles.ai[props.ai];
    }
    return globalStyles.ai.default;
};

export const textAlign = (props: { textAlign?: AlignTextTypes }) => {
    if (props.textAlign) {
        return globalStyles.textAlign[props.textAlign];
    }
    return globalStyles.textAlign.default;
};

const fontsConfig = [
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-ExtraLight',
        fontWeight: 100,
    },
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-Light',
        fontWeight: 300,
    },
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-Regular',
        fontWeight: 500,
    },
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-SemiBold',
        fontWeight: 600,
    },
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-Bold',
        fontWeight: 700,
    },
    {
        name: 'Cairo',
        src: 'Cairo/Cairo-Black',
        fontWeight: 800,
    },
    {
        name: 'Material',
        src: 'Material/material',
        fontWeight: 400,
    },
];

function fontFace(name: string, src: string, fontWeight: number) {
    return `
        @font-face{
            font-family: '${name}';
            font-style: normal;
            font-weight: ${fontWeight};
            src: url(${'/fonts/' + src + '.eot'});
            src: url(${'/fonts/' + src + '.eot'}?#iefix) format('embedded-opentype'),
                 url(${'/fonts/' + src + '.woff'}) format('woff'),
                 url(${'/fonts/' + src + '.ttf'}) format('truetype'),
                 url(${'/fonts/' + src + '.svg'}#${name}) format('svg');
        }
    `;
}

export const withFonts = () => {
    return fontsConfig.map((item) => {
        const { name, src, fontWeight } = item;
        return fontFace(name, src, fontWeight);
    });
};

export const GlobalStyle = createGlobalStyle`
  ${withFonts()};
  body {
    margin: 0;
    width: 100%;  
    padding: 0;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 20%;
    ${globalStyles.fonts.default};
    ${globalStyles.weight.default};
    
  }
  h1,h2,h3,h4,h5,h6,p,ol,ul {
    padding: 0;
    margin: 0;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
`;
