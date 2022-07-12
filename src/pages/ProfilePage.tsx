import React, {useEffect, useState} from 'react';
import EstateList from "../components/EstateList";
import {useFetching} from "../hooks/useFetching";
import {Estate} from "../core/api/EstateOwnersApi";
import {EstatesService} from "../core/api/EstatesService";

const ProfilePage = () => {
    const [estates, setEstates] = useState<Estate[]>();

    const [fetchEstates, isLoading, error] = useFetching(async () => {
        const list = await EstatesService.getListWithAccessCheck();
        setEstates(list);
    })

    useEffect(() => {
        fetchEstates();
    }, []);

    return (
        <div>
            <h3>Список помещений</h3>
            {estates &&
                <EstateList estates={estates} isLoading={isLoading} error={error} linkPath='/estates'></EstateList>
            }
        </div>
    );
};

export default ProfilePage;