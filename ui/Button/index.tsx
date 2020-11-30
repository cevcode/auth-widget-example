import React from 'react';
import styled, { css } from 'styled-components';
import Ripples from 'react-ripples';
import { inject, observer } from 'mobx-react';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ComponentSizesTypes, ISpaceTypes } from 'helpers/enums';
import { componentSize, space, globalStyles } from 'helpers/theme';
import { IAppStore } from 'stores/appStore/types';
import { IPalette, ITheme } from 'models/theme';

enum IButtonVariant {
    text = 'text',
    outlined = 'outlined',
    contained = 'contained',
}

export enum ButtonStatuses {
    loading = 'loading',
    error = 'error',
    success = 'success',
    'null' = 'null',
}

export interface IButton extends ISpaceTypes {
    appStore?: IAppStore;
    status?: ButtonStatuses | null;
    color?: IPalette | string;
    componentSize?: ComponentSizesTypes | string;
    onClick?: (...args: any) => void;
    disabled?: boolean;
    type?: 'submit' | 'button';
    variant?: IButtonVariant | string;
    padding?: string;
}

function getButtonColor(props) {
    const { variant, theme, color } = props;
    switch (variant) {
        case IButtonVariant.contained:
            return `
                background-color: ${theme.palette[color]};
                color: ${theme.palette.lightText};
            `;
        case IButtonVariant.outlined:
            return `
                border: 1px solid ${theme.palette[color]};
                color: ${theme.palette[color]};
                background-color: transparent;
            `;
        case IButtonVariant.text:
            return `
                color: ${theme.palette[color]};
                background-color: transparent;
            `;
    }
}

const StyledButton = styled.button<IButton>`
    ${globalStyles.fontSizes.default};
    ${globalStyles.fonts.default};
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    height: ${globalStyles.global.componentHeight}px;
    text-transform: uppercase;
    border: none;
    border-radius: ${globalStyles.global.borderRadius}px;
    justify-content: center;
    outline: none;
    :hover {
        filter: grayscale(0.2);
        transition: 0.4s ease;
    }
    padding: ${({ padding }) => (padding ? padding : '0')};
    ${(props) => getButtonColor(props)};

    ${(props) =>
        props.disabled &&
        css`
            background: ${({ theme }) => theme.palette.disabled};
            color: ${({ theme }) => theme.palette.lightText};
        `}
    ${(props) =>
        props.variant === 'text' &&
        css`
            font-size: 12px;
            text-transform: none;
        `}
`;

const StyledButtonWrapper = styled.div<any>`
    ${componentSize};
    ${space};
`;

const StyledRipples = styled(Ripples)`
    width: 100%;
`;

const ButtonComponent: React.FC<IButton> = inject('appStore')(
    observer(({ status, type, appStore, color, onClick, disabled, variant, padding, children }) => {
        const theme: ITheme | undefined = appStore && appStore.values.theme;
        switch (status) {
            case ButtonStatuses.loading:
                return (
                    <StyledButton
                        type={type}
                        theme={theme}
                        color={color}
                        onClick={(i) => i}
                        disabled={false}
                        padding={padding}
                        variant="outlined"
                    >
                        <Spin size="small" />
                    </StyledButton>
                );
            case ButtonStatuses.error:
                return (
                    <StyledButton
                        type={type}
                        theme={theme}
                        color="error"
                        onClick={(i) => i}
                        disabled={false}
                        padding={padding}
                        variant="contained"
                    >
                        <CloseCircleOutlined />
                    </StyledButton>
                );
            case ButtonStatuses.success:
                return (
                    <StyledButton
                        type={type}
                        theme={theme}
                        color="success"
                        onClick={(i) => i}
                        disabled={false}
                        padding={padding}
                        variant="contained"
                    >
                        <CheckCircleOutlined />
                    </StyledButton>
                );
            default:
                return (
                    <StyledButton
                        type={type}
                        theme={theme}
                        color={color}
                        onClick={onClick}
                        disabled={disabled}
                        padding={padding}
                        variant={variant}
                    >
                        {children}
                    </StyledButton>
                );
        }
    })
);

const Button: React.FC<IButton> = ({
    appStore,
    children,
    type = 'button',
    color = 'main',
    componentSize = ComponentSizesTypes.default,
    onClick,
    disabled,
    variant = IButtonVariant.contained,
    status,
    padding,
    ...props
}) => {
    return (
        <StyledButtonWrapper componentSize={componentSize} {...props}>
            <StyledRipples color="rgba(255,255,255,0.4)">
                <ButtonComponent
                    type={type}
                    status={status}
                    color={color}
                    onClick={onClick}
                    disabled={disabled}
                    padding={padding}
                    variant={IButtonVariant[variant]}
                >
                    {children}
                </ButtonComponent>
            </StyledRipples>
        </StyledButtonWrapper>
    );
};

export { Button };
