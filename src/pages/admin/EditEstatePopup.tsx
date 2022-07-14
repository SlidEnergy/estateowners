import React, {ChangeEvent, useState} from 'react';
import {EstateBindingModel, EstateType} from "../../core/api/EstateOwnersApi";

type Props = {
    cancel: () => void,
    save: (model: EstateBindingModel) => Promise<void>
}

const EditEstatePopup = (props: Props) => {
    const [estate, setEstate] = useState<EstateBindingModel>(new EstateBindingModel({type: EstateType.Apartment}));

    return (
        <div>
            <input type="text" value={estate.buildingId}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => setEstate(new EstateBindingModel({...estate, buildingId: +event.target.value}))}
                   placeholder="Идентификатор здания"/>
            <input type="text" value={estate.type}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => setEstate(new EstateBindingModel({...estate, type: EstateType.Apartment}))}
                   placeholder="Тип помещения"/>
            <input type="text" value={estate.number}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => setEstate(new EstateBindingModel({...estate, number: event.target.value}))}
                   placeholder="Номер помещения"/>
            <input type="text" value={estate.area}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => setEstate(new EstateBindingModel({...estate, area: +event.target.value}))}
                   placeholder="Площадь"/>
            <button onClick={() => props.save(estate)}>Сохранить</button>
            <button onClick={props.cancel}>Отмена</button>
        </div>
    );
};

export default EditEstatePopup;