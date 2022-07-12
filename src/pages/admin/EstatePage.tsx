import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {Estate} from "../../core/api/EstateOwnersApi";
import {EstatesService} from "../../core/api/EstatesService";
import Loader from "../../components/loader/loader";
import EstateInfo from "../../components/EstateInfo";

const EstatePage = () => {
    const params = useParams();

    const [estate, setEstate] = useState<Estate>();
    const [fetchEstateById, isEstateLoading, EstateError] = useFetching(async () => {
        if(params.id) {
            const response = await EstatesService.getById(+params.id);

            setEstate(response);
        }
    })

    useEffect(() => {
        fetchEstateById();
    }, [params.id])

    return (
        <div>
            {isEstateLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {estate &&
                <EstateInfo estate={estate}></EstateInfo>
            }
            {EstateError &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{EstateError}</div>
                </div>
            }
        </div>
    );
};

export default EstatePage;