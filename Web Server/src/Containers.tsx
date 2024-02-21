import React, { useState } from 'react';
import './App.css';
import { Row, Col} from 'antd';
import Container from './Container';

interface ContainersProps {
    container1Percent: number;
    container2Percent: number;
    container3Percent: number;
    container4Percent: number;
    container1Name: string;
    container2Name: string;
    container3Name: string;
    container4Name: string;
    container1CurrMass: number;
    container2CurrMass: number;
    container3CurrMass: number;
    container4CurrMass: number;
    container1InitMass: number;
    container2InitMass: number;
    container3InitMass: number;
    container4InitMass: number;
}
    
const Containers: React.FC<ContainersProps> = ({ container1Percent, container2Percent, container3Percent, container4Percent, 
    container1Name, container2Name, container3Name, container4Name, container1CurrMass, container2CurrMass, container3CurrMass,
    container4CurrMass, container1InitMass,  container2InitMass, container3InitMass, container4InitMass}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
            <Container containerPercent={container1Percent} containerName={container1Name} currentMass={container1CurrMass} initialMass={container1InitMass}/>
        </Col>
        <Col span={6}>
            <Container containerPercent={container2Percent} containerName={container2Name} currentMass={container2CurrMass} initialMass={container2InitMass}/>
        </Col>
        <Col span={6}>
            <Container containerPercent={container3Percent} containerName={container3Name} currentMass={container3CurrMass} initialMass={container3InitMass}/>
        </Col>
        <Col span={6}>
            <Container containerPercent={container4Percent} containerName={container4Name} currentMass={container4CurrMass} initialMass={container4CurrMass}/>
        </Col>
      </Row>
    </div>

  );
}

export default Containers
