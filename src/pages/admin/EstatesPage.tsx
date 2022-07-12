import React, {useEffect, useState} from 'react';
import {Estate} from "../../core/api/EstateOwnersApi";
import {useFetching} from "../../hooks/useFetching";
import {EstatesService} from "../../core/api/EstatesService";
import EstateList from "../../components/EstateList";

const EstatesPage = () => {
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
            <h3>Список помещений (Всего {estates?.length || ''})</h3>
            <EstateList estates={estates} isLoading={isLoading} error={error} linkPath='/admin/estates'></EstateList>
        </div>
    );
};

export default EstatesPage;