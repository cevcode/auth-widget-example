import React from 'react';
import { Formik, Form as FormikFormWrap } from 'formik';

interface IFormProps {
    initialValues: any;
    validations?: any;
    onSubmit?: (values, actions) => any;
    onChange?: (values, errors) => any;
    renderMode?: 'config' | 'JSX';
    children?: any;
    submitForm?: (values: any) => any;
    getRef?: (ref: any) => void;
}

export class Form extends React.Component<IFormProps> {
    private form: any = null;
    onSubmit = (values: object, actions: any) => {
        const { onSubmit } = this.props;
        onSubmit instanceof Function && onSubmit(values, actions);
    };

    getRef = (form) => {
        const { getRef } = this.props;
        this.form = form;
        getRef instanceof Function && getRef(form);
    };

    validate = (values: any) => {
        const { validations, onChange } = this.props;
        const errors = {};

        Object.entries(validations).forEach(([fieldName, rules]: any) => {
            errors[fieldName] = rules.map((rule) => rule({ value: values[fieldName], values })).filter((i) => !!i)[0];
        });

        for (let fieldName in errors) {
            if (!errors[fieldName]) {
                delete errors[fieldName];
            }
        }

        onChange instanceof Function && onChange(values, errors);

        return errors;
    };

    render() {
        const { initialValues, children } = this.props;

        return (
            <Formik
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                innerRef={this.getRef}
                validate={this.validate}
            >
                <FormikFormWrap style={{ display: 'flex', flexDirection: 'column' }}>{children}</FormikFormWrap>
            </Formik>
        );
    }
}
