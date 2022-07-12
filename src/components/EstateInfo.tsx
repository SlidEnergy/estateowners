import React from 'react';
import {Estate} from "../core/api/EstateOwnersApi";

type Props = {
    estate: Estate
}

const EstateInfo = (props: Props) => {
    const estate = props.estate;

    return (
        <dl>
            <dt>Id</dt>
            <dd>{estate.id}</dd>
            <dt>Строение</dt>
            <dd>{estate.building}</dd>
            <dt>Тип объекта</dt>
            <dd>{estate.type}</dd>
            <dt>Номер</dt>
            <dd>{estate.number}</dd>
            <dt>Площадь</dt>
            <dd>{estate.area}</dd>
        </dl>
    );
};

export default EstateInfo;