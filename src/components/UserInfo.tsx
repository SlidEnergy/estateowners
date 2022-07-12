import React from 'react';
import {User} from "../core/api/EstateOwnersApi";

type Props = {
    user: User
}

const UserInfo = (props: Props) => {
    const user = props.user;

    return (
        <dl>
            <dt>Id</dt>
            <dd>{user.id}</dd>
            <dt>Фамилия</dt>
            <dd>{user.lastName}</dd>
            <dt>Имя</dt>
            <dd>{user.firstName}</dd>
            <dt>Отчество</dt>
            <dd>{user.middleName}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Телефон</dt>
            <dd>{user.phoneNumber}</dd>
        </dl>
    );
};

export default UserInfo;