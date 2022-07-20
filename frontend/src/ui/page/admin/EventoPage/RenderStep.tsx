import React, { Dispatch, SetStateAction } from 'react'
import EspacioCreate from './EspacioCreate';
import EventoCreate from './EventoCreate';
import HorarioCreate from './HorarioCreate';
import LugarCreate from './LugarCreate';
import ResumenCreate from './ResumenCreate';
import SectorCreate from './SectorCreate';

interface Props {
    setstep: Dispatch<SetStateAction<number>>;
    step: number;
}

const RenderStep = (props: Props) => {

    const { step, setstep } = props;

    switch (step) {
        case 0:
            return <EventoCreate setstep={setstep} />
        case 1:
            return <LugarCreate setstep={setstep} />
        case 2:
            return <HorarioCreate setstep={setstep} />
        case 3:
            return <SectorCreate setstep={setstep} />
        case 4:
            return <EspacioCreate setstep={setstep} />
        case 5:
            return <ResumenCreate />
        default:
            return <EventoCreate setstep={setstep} />
    }
}

export default RenderStep