import React from 'react';
import { connect, Field as FormikField } from 'formik';
import { Description } from 'ui';
import { FontSizeTypes } from 'helpers/enums';
import { componentSize, space } from 'helpers/theme';
import styled from 'styled-components';
import { Input } from 'widgets/Form/Fields/Input';
import { Textarea } from 'widgets/Form/Fields/Textarea';
import { ISelectOptionsModel, SelectSearch } from 'widgets/Form/Fields/SelectSearch';
import { Checkbox } from 'widgets/Form/Fields/Checkbox';
import { inject } from 'mobx-react';
import { IPalette } from 'models/theme';

type TFieldType = 'text' | 'password' | 'textarea' | 'select' | 'checkbox';

interface IFieldProps {
    name: string;
    type?: TFieldType;
    label?: string;
    color?: string;
    icon?: string;
    error?: string;
    placeholder?: string;
    margin?: string;
    componentSize?: string;
    appStore?: any;
    disabled?: boolean;
    options?: ISelectOptionsModel[];
}

const StyledFieldWrapperHOC = styled.div`
    ${componentSize};
    ${space};
`;

const getComponentByType = (type: string) => {
    switch (type) {
        default:
        case 'email':
        case 'text':
        case 'password':
        case 'search':
            return Input;
        case 'textarea':
            return Textarea;
        case 'select':
            return SelectSearch;
        case 'checkbox':
            return Checkbox;
    }
};

function fieldStateColor(color, error, valid) {
    if (error) {
        return 'error';
    }
    if (valid) {
        return 'success';
    }
    return color;
}

@inject('appStore')
class FieldC extends React.PureComponent<IFieldProps & { formik?: any }> {
    render() {
        const {
            name,
            color = 'disabled',
            type = 'text',
            placeholder,
            label,
            icon,
            formik,
            options,
            appStore,
            disabled,
            ...props
        } = this.props;
        const { theme = {} } = appStore.values;
        const error = formik.errors[name] || false;
        const touched = formik.touched[name] || false;
        const showError = touched && error;
        const componentColor = fieldStateColor(color, error && touched, !error && touched);
        const Component = getComponentByType(type);
        return (
            <StyledFieldWrapperHOC componentSize={componentSize} {...props}>
                {label && (
                    <Description fontSize={FontSizeTypes.s} color="darkText" mbottom="5px">
                        {label}
                    </Description>
                )}
                <FormikField
                    icon={icon}
                    color={componentColor}
                    component={Component}
                    formikField={true}
                    showError={showError}
                    name={name}
                    type={type}
                    theme={theme}
                    options={options}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...props}
                />
                {showError && (
                    <Description mtop="6px" fontSize={FontSizeTypes.s} color={IPalette.error}>
                        {error}
                    </Description>
                )}
            </StyledFieldWrapperHOC>
        );
    }
}

// @ts-ignore
export const Field = connect(FieldC);
