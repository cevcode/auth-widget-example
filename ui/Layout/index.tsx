import React from 'react';
import styled, { css } from 'styled-components';
import { AlignItemsTypes, DirectionTypes, ISpaceTypes, JustifyContentTypes } from 'helpers/enums';
import { ai, direction, jc, space } from 'helpers/theme';

const StyledLayout = styled.div<ILayout>`
    ${space};
    display: flex;
    position: relative;
    box-sizing: border-box;
    height: ${(props) => (props.componentHeight ? props.componentHeight : 'auto')};
    width: ${(props) => (props.componentWidth ? props.componentWidth : '100%')};
    ${direction};
    ${jc};
    ${ai};
    ${(props) =>
        props.noFlex &&
        css`
            width: auto;
        `}
`;

export interface ILayout extends ISpaceTypes {
    direction?: DirectionTypes;
    jc?: JustifyContentTypes | string;
    ai?: AlignItemsTypes | string;
    componentHeight?: string;
    componentWidth?: string;
    noFlex?: boolean;
    style?: any;
    onClick?: (...args: any) => any;
}

const Layout: React.FC<ILayout> = ({
    direction,
    jc,
    ai,
    noFlex,
    children,
    componentHeight,
    componentWidth,
    ...props
}) => {
    return (
        <StyledLayout
            direction={direction}
            jc={jc}
            ai={ai}
            noFlex={noFlex}
            componentHeight={componentHeight}
            componentWidth={componentWidth}
            {...props}
        >
            {children}
        </StyledLayout>
    );
};

const Row: React.FC<ILayout> = (props) => {
    const { children } = props;
    return (
        <Layout {...props} direction={DirectionTypes.row}>
            {children}
        </Layout>
    );
};

const Column: React.FC<ILayout> = (props) => {
    const { children } = props;
    return (
        <Layout {...props} direction={DirectionTypes.column}>
            {children}
        </Layout>
    );
};

export { Row, Column };
