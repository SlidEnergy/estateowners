import React from 'react';
import {Estate} from "../core/api/EstateOwnersApi";
import Loader from "./loader/loader";
import {Link} from "react-router-dom";

type Props = {
    estates: Estate[] | undefined;
    isLoading: boolean;
    error: string;
    linkPath: string;
}

const EstateList = (props: Props) => {
    return (
        <div>
            {props.isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader></Loader></div>
            }
            {props.error &&
                <div style={{marginTop: '20px'}}>
                    <h5>Произошла ошибка</h5>
                    <div>{props.error}</div>
                </div>
            }

            {props.estates &&
                props.estates.map((estate, index) =>
                    <div key={estate.id}>
                        {estate.id} {estate.building} {estate.type} {estate.number} {estate.area} <Link
                        to={props.linkPath + '/' + estate.id}>Перейти</Link>
                    </div>)
            }
        </div>
    );
};

export default EstateList;