import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import {UsersService} from "../../core/api/UsersService";
import Loader from "../../components/loader/loader";
import {Link} from "react-router-dom";
import {User} from "../../core/api/EstateOwnersApi";

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>();

    const [fetchUsers, isLoading, error] = useFetching(async () => {
        const list = await UsersService.getList();
        setUsers(list);
    })

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h3>Список пользователей (Всего {users?.length || ''})</h3>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {error &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{error}</div>
                </div>
            }

            {users &&
                users.map((user, index) =>
                    <div key={user.id}>
                        {user.lastName} {user.firstName} {user.middleName} {user.isAdmin ? "admin" : ""} {user.email}
                        <Link style={{marginLeft: 10}} to={'/admin/users/' + user.id}>Перейти</Link>
                    </div>)
            }
        </div>
    );
};

export default UsersPage;