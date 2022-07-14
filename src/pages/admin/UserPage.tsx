import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {UsersService} from "../../core/api/UsersService";
import Loader from "../../components/loader/loader";
import EstateList from "../../components/EstateList";
import {Estate, EstateBindingModel, User} from "../../core/api/EstateOwnersApi";
import {EstatesService} from "../../core/api/EstatesService";
import UserInfo from "../../components/UserInfo";
import EditEstatePopup from "./EditEstatePopup";

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
    const [editPopupVisible, setEditPopupVisible] = useState<boolean>(false);

    const [fetchEstates, isEstatesLoading, EstatesError] = useFetching(async () => {
        const userId = params.id;

        if(userId) {
            const list = await EstatesService.getListWithAccessCheck(userId);

            setEstates(list);
        }
    })

    const [executeSaveEstate, isSaveLoading, saveError] = useFetching(async (model) => {
        const userId = params.id;

        if(userId) {
            const newEstate = await EstatesService.add(model, userId);

            if (estates && newEstate)
                setEstates([...estates, newEstate]);
            else if (newEstate)
                setEstates([newEstate]);
        }
    })

    useEffect(() => {
        fetchUserById();
    }, [])

    useEffect(() => {
        fetchEstates();
    }, []);

    function addEstate() {
        setEditPopupVisible(true);
    }

    function cancelEdit() {
        setEditPopupVisible(false);
    }

    async function saveEstate(model: EstateBindingModel) {
        await executeSaveEstate(model);
    }

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
            <button onClick={addEstate}>Добавить</button>
            {estates &&
                <EstateList estates={estates} isLoading={isUserLoading} error={UserError} linkPath='/admin/estates'></EstateList>
            }
            {editPopupVisible &&
                <EditEstatePopup save={saveEstate} cancel={cancelEdit}></EditEstatePopup>
            }
        </div>
    );
};

export default UserPage;