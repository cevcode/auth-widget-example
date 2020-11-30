import React, { FC, ReactElement } from 'react';
import { Auth } from '../widgets/Auth';
import { Column } from '../ui/Layout';
import { AlignItemsTypes } from '../helpers/enums';

export interface IAuthPageProps {
    authType: 'signIn' | 'signOut';
    history: History;
}

const AuthPage: FC<IAuthPageProps> = ({ history, authType }: IAuthPageProps): ReactElement => {
    return (
        <Column componentHeight="91vh" ai={AlignItemsTypes.center}>
            <Column ai="center" jc="center" componentHeight="100vh">
                <Auth authType={authType} history={history} />
            </Column>
        </Column>
    );
};

export { AuthPage };
