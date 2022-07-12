import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {UsersService} from "../../core/api/UsersService";
import Loader from "../../components/loader/loader";
import EstateList from "../../components/EstateList";
import {Estate, User} from "../../core/api/EstateOwnersApi";
import {EstatesService} from "../../core/api/EstatesService";
import UserInfo from "../../components/UserInfo";

const UserPage = () => {
    const params = useParams();
    const [user, setUser] = useState<User>();
    const [fetchUserById, isUserLoading, UserError] = useFetching(async () => {
        if (params.id) {
            const response = await UsersService.getById(params.id);

            setUser(response);
        }
    })

    const [estates, setEstates] = useState<Estate[]>();

    const [fetchEstates, isEstatesLoading, EstatesError] = useFetching(async () => {
        const list = await EstatesService.getListWithAccessCheck();
        setEstates(list);
    })

    useEffect(() => {
        fetchUserById();
    }, [])

    useEffect(() => {
        fetchEstates();
    }, []);

    return (
        <div>
            {isUserLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {user &&
                <>
                    <h1>Пользователь</h1>
                    <UserInfo user={user}></UserInfo>
                </>
            }
            {UserError &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{UserError}</div>
                </div>
            }
            <h3>Список помещений (Всего {estates?.length || ''})</h3>
            {estates &&
                <EstateList estates={estates} isLoading={isUserLoading} error={UserError}></EstateList>
            }
        </div>
    );
};

export default UserPage;