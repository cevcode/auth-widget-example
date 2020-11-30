import React from 'react';
import styled from 'styled-components';
import { ISpaceTypes } from 'helpers/enums';
import { space } from 'helpers/theme';
import { inject, observer } from 'mobx-react';
import { ITheme } from 'models/theme';
import { IAppStore } from 'stores/appStore/types';

const StyledBox = styled.div<IBox>`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.lightText};
    ${space};
    box-sizing: border-box;
    box-shadow: rgba(0, 169, 255, 0.2) 0px 20px 40px;
    border-radius: 5px;
    height: ${(props) => (props.componentHeight ? props.componentHeight : 'auto')};
    width: ${(props) => (props.componentWidth ? props.componentWidth : '100%')};
    border-bottom: ${({ theme, bottomBorder }) => (bottomBorder ? `3px solid ${theme.palette.main}` : 'none')};
`;

interface IBox extends ISpaceTypes {
    appStore?: IAppStore;
    componentWidth?: string;
    componentHeight?: string;
    bottomBorder?: boolean;
    ref?: HTMLDivElement;
}

const Box: React.FC<IBox> = inject('appStore')(
    observer(({ appStore, children, componentWidth, bottomBorder, componentHeight, ...props }) => {
        const theme: ITheme | undefined = appStore && appStore.values.theme;
        return (
            <StyledBox
                theme={theme}
                bottomBorder={bottomBorder}
                componentHeight={componentHeight}
                componentWidth={componentWidth}
                {...props}
            >
                {children}
            </StyledBox>
        );
    })
);

export { Box };
