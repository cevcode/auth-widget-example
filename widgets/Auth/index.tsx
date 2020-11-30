import React from 'react';
import styled from 'styled-components';
import { History } from 'history';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Box, Button, Column, Title } from 'ui';
import { ILayout } from 'ui/Layout';
import { ComponentSizesTypes, FontSizeTypes, WeightTypes } from 'helpers/enums';
import config from './config.json';
import { IUserStoreModel } from 'stores/userStore/types';
import { ISelectOptionsModel } from 'widgets/Form/Fields/SelectSearch';
import { Field, Form } from 'widgets';
import _ from 'lodash';
import { isEmail, isRequired, lessThan, moreThan, onlyLatin, repeatPassword } from 'validations';

const StyledAuthWrapper = styled(Column)<ILayout>`
    form {
        width: 100%;
        align-items: center;
        a {
            text-align: right;
            margin-top: 10px;
        }
    }
`;

interface IAuthFields {
    icon: string;
    type: string;
    placeholder: string;
    name: string;
    options?: ISelectOptionsModel;
    componentSize?: ComponentSizesTypes | string;
    label?: string;
}

interface IRenderFields {
    fields: IAuthFields[];
}

const RenderFields: React.FC<IRenderFields> = ({ fields }): any => {
    return fields.map((item) => {
        const { type, name, options, componentSize, label, placeholder, ...props } = item;
        return (
            <Field
                key={name}
                label={label}
                placeholder={placeholder}
                componentSize="full"
                color="disabled"
                type={type}
                options={options}
                mtop="20px"
                name={name}
                {...props}
            />
        );
    });
};

function getButtonText(authType: string) {
    const textArr = ['LOGIN', 'Sign Up'];
    if (authType === 'signUp') {
        return textArr.reverse();
    }
    return textArr;
}

interface IAuthProps {
    authType: 'signIn' | 'signOut';
    history: History;
    userStore?: IUserStoreModel;
}

const SigninSchema = {
    name: [isRequired(), moreThan(2), lessThan(50)],
    password: [isRequired(), moreThan(8), lessThan(50), onlyLatin()],
};

const SignupSchema = {
    name: [isRequired(), moreThan(2), lessThan(50)],
    surName: [isRequired(), moreThan(2), lessThan(50)],
    email: [isRequired(), isEmail()],
    password: [isRequired(), moreThan(8), lessThan(50), onlyLatin()],
    repeatPassword: [isRequired(), repeatPassword()],
};

@inject('userStore')
@(withRouter as any)
@observer
class Auth extends React.Component<IAuthProps, any> {
    private formRef: any;
    @observable private isFormValid: boolean = false;

    onSubmit = (values, actions) => {
        const { userStore, history, authType } = this.props;
        if (authType === 'signIn') {
            const modelToSend = {
                name: values.name,
                password: values.password,
            };

            userStore && userStore.signInUser(modelToSend);
        } else {
            const modelToSend = {
                email: values.email,
                password: values.password,
                name: values.name,
                surName: values.surName,
                avatar: '',
            };
            userStore && userStore.signUpUser(modelToSend);
        }
    };

    onOuterSubmit = () => {
        this.formRef.submitForm();
    };

    onChange = (values: any, errors) => {
        this.isFormValid = _.isEmpty(errors);
    };

    resetForm = () => {
        this.formRef.setTouched({});
    };

    render() {
        const { authType } = this.props;
        return config[authType].map((data, i) => (
            <StyledAuthWrapper componentWidth="420px" key={i}>
                <Form
                    getRef={(ref) => (this.formRef = ref)}
                    initialValues={data.initialValues}
                    onSubmit={this.onSubmit}
                    validations={authType === 'signIn' ? SigninSchema : SignupSchema}
                    onChange={this.onChange}
                >
                    <Title
                        fontSize={FontSizeTypes.l}
                        weight={WeightTypes.w500}
                        color="darkText"
                        mbottom="20px"
                        uppercase
                    >
                        {data.title}
                    </Title>
                    <Box padding="20px">
                        <RenderFields fields={data.fields} />
                        <Link to="/forgot">Password forgotten?</Link>
                    </Box>
                    <Button
                        type="submit"
                        mtop="40px"
                        componentSize={ComponentSizesTypes.s}
                        onClick={this.onOuterSubmit}
                        disabled={!this.isFormValid}
                    >
                        {getButtonText(authType)[0]}
                    </Button>
                </Form>
            </StyledAuthWrapper>
        ));
    }
}

export { Auth };
