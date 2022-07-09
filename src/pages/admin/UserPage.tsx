import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {UsersService} from "../../core/api/UsersService";
import Loader from "../../components/loader/loader";
import {User} from "../../core/models/User";

const UserPage = () => {
    const params = useParams();
    const [user, setUser] = useState<User>();
    const [fetchUserById, isLoading, error] = useFetching(async () => {
        if(params.id) {
            const response = await UsersService.getById(params.id);

            setUser(response);
        }
    })

    useEffect(() => {
        fetchUserById();
    }, [])

    return (
        <div>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {user &&
                <h1>Пользователь {user.email}</h1>
            }
            {error &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{error}</div>
                </div>
            }
        </div>
    );
};

export default UserPage;