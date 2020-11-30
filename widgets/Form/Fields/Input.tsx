import * as React from 'react';
import { InputTypes, ISpaceTypes } from 'helpers/enums';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import { globalStyles } from 'helpers/theme';
import { Icon } from 'ui/Icon';
import { IAppStore } from 'stores/appStore/types';
import { IPalette, ITheme } from 'models/theme';

const StyledField = styled.div`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input<IInput>`
    width: 100%;
    ${globalStyles.fonts.default};
    ${globalStyles.fontSizes.default};
    height: ${globalStyles.global.componentHeight}px;
    border-radius: ${globalStyles.global.borderRadius}px;
    border: 1px solid ${({ theme }) => theme.palette.disabled};
    border-left: 4px solid ${({ theme, color }) => theme.palette[color]};
    padding: 0 12px;
    box-sizing: border-box;
    outline: 0;

    &:focus {
        border-left: 4px solid ${({ theme }) => theme.palette.main};
        transition: 0.2s;
    }

    ::placeholder {
        color: ${({ theme }) => theme.palette.disabled};
    }

    ${(props) =>
        props.disabled &&
        css`
            background: ${({ theme }) => theme.palette.disabled};
            color: ${({ theme }) => theme.palette.lightText};
            border-color: ${({ theme }) => theme.palette.disabled};
        `}
    ${(props) =>
        props.icon &&
        css`
            padding-left: 44px;
        `}
`;

interface IInput extends ISpaceTypes {
    value: any;
    onBlur?: () => void;
    onFocus?: () => void;
    onFieldChange?: (e: any) => void;
    disabled?: boolean;
    className?: string;
    placeholder: string;
    type: InputTypes;
    name: string;
    id: string;
    autoComplete?: string;
    icon?: string;
    color: IPalette | string;
    formikField?: boolean;
    appStore?: IAppStore;
}

function getIcon(icon, color) {
    if (icon) {
        return <Icon name={icon} color={color} wrapped />;
    }
    return null;
}

interface IProps {
    [name: string]: any;
}

@inject('appStore')
@observer
export class Input extends React.Component<IProps> {
    onChange = (event: any) => {
        const { field, form } = this.props;
        form.setFieldValue(field.name, event.target.value);
    };

    render() {
        const { icon, color, field, form, showError, ...props } = this.props;
        const { handleBlur } = form;
        const theme: ITheme | undefined = this.props.appStore && this.props.appStore.values.theme;
        return (
            <StyledField>
                {getIcon(icon, color)}
                <StyledInput
                    value={field.value}
                    onChange={this.onChange}
                    theme={theme}
                    color={color}
                    name={field.name}
                    onBlur={handleBlur}
                    {...props}
                />
            </StyledField>
        );
    }
}
