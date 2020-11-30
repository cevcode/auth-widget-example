import React from 'react';
import styled from 'styled-components';
import { PositionTypes, FontSizeTypes, WeightTypes, ISpaceTypes } from 'helpers/enums';
import { inject, observer } from 'mobx-react';
import { space, weight, fontSize, align, globalStyles } from 'helpers/theme';
import { IAppStore } from 'stores/appStore/types';
import { IPalette, ITheme } from 'models/theme';

const StyledTitle = styled.h2<ITitle>`
    ${space};
    ${weight};
    ${fontSize};
    ${align};
    ${globalStyles.fonts.default};
    display: flex;
    width: auto;
    color: ${({ theme, color }) => theme.palette[color]};
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
`;

export interface ITitle extends ISpaceTypes {
    appStore?: IAppStore;
    position?: PositionTypes | string;
    color?: IPalette | string;
    fontSize?: FontSizeTypes | string;
    uppercase?: boolean;
    weight?: WeightTypes | string;
}

const Title: React.FC<ITitle> = inject('appStore')(
    observer(({ appStore, children, color = 'darkText', fontSize, weight, position, ...props }) => {
        const theme: ITheme | undefined = appStore && appStore.values.theme;
        return (
            <StyledTitle theme={theme} color={color} fontSize={fontSize} position={position} weight={weight} {...props}>
                {children}
            </StyledTitle>
        );
    })
);

export { Title };
