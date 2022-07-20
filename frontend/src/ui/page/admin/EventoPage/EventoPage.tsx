import React, { useState } from 'react'
import Steps from 'rc-steps';
import { Container } from 'react-bootstrap'

import '../../../assets/step/index.css';
import '../../../assets/step/iconfont.css';
import { CARD } from '../../../const/theme'
import RenderStep from './RenderStep';

const EventoPage = () => {

  const [step, setstep] = useState<number>(0);

  return (

    <Container className={'mt-4 text-dark pb-5'}>
      <h4>Eventos</h4>
      <hr />

      <Container className={'rounded shadow p-2'} style={{ backgroundColor: CARD }}>

        <Steps labelPlacement='vertical' current={step}>
          <Steps.Step stepIndex={0} title="evento" />
          <Steps.Step stepIndex={1} title="lugar" />
          <Steps.Step stepIndex={2} title="horario" />
          <Steps.Step stepIndex={3} title="sector" />
          <Steps.Step stepIndex={4} title="espacio" />
          <Steps.Step stepIndex={5} title="resumen" />
        </Steps>
        
        <hr />

        <RenderStep step={step} setstep={setstep} />

      </Container>
    </Container>
  )
}

export default EventoPage