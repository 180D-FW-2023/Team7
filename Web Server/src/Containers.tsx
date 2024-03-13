import React, { useState, useEffect } from 'react';
import './App.css';
import { Row, Col} from 'antd';
import Container from './Container';
// import { sendContainerDataToFirebase } from './firebaseService';

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
  container1LUX: number;
  container2LUX: number;
  container3LUX: number;
  container4LUX: number;
  container1UV: number;
  container2UV: number;
  container3UV: number;
  container4UV: number;
  container1MaxHumid: number;
  container2MaxHumid: number;
  container3MaxHumid: number;
  container4MaxHumid: number;
  container1MinHumid: number;
  container2MinHumid: number;
  container3MinHumid: number;
  container4MinHumid: number;
  container1MaxTemp: number;
  container2MaxTemp: number;
  container3MaxTemp: number;
  container4MaxTemp: number;
  container1MinTemp: number;
  container2MinTemp: number;
  container3MinTemp: number;
  container4MinTemp: number;
  container1HumidBool: boolean;
  container2HumidBool: boolean;
  container3HumidBool: boolean;
  container4HumidBool:boolean;
  container1LUXBool: boolean;
  container2LUXBool: boolean;
  container3LUXBool: boolean;
  container4LUXBool: boolean;
  container1TempBool: boolean;
  container2TempBool: boolean;
  container3TempBool: boolean;
  container4TempBool: boolean;
  container1UVBool: boolean;
  container2UVBool: boolean;
  container3UVBool: boolean;
  container4UVBool: boolean;
  container1OnInputLUXChange: (value: number) => void; // Add this prop definition
  container1OnInputUVChange: (value: number) => void;
  container1OnInputHumidChange: (value: number[]) => void;
  container1OnInputTempChange: (value: number[]) => void;
  container1OnLUXToggle: (value: boolean) => void;
  container1OnUVToggle: (value: boolean) => void;
  container1OnHumidToggle: (value: boolean) => void;
  container1OnTempToggle: (value: boolean) => void;
  container1InputModalTitle: (value: string) => void;
  //container 2
  container2OnInputLUXChange: (value: number) => void; // Add this prop definition
  container2OnInputUVChange: (value: number) => void;
  container2OnInputHumidChange: (value: number[]) => void;
  container2OnInputTempChange: (value: number[]) => void;
  container2OnLUXToggle: (value: boolean) => void;
  container2OnUVToggle: (value: boolean) => void;
  container2OnHumidToggle: (value: boolean) => void;
  container2OnTempToggle: (value: boolean) => void;
  container2InputModalTitle: (value: string) => void;
  //container 3
  container3OnInputLUXChange: (value: number) => void; // Add this prop definition
  container3OnInputUVChange: (value: number) => void;
  container3OnInputHumidChange: (value: number[]) => void;
  container3OnInputTempChange: (value: number[]) => void;
  container3OnLUXToggle: (value: boolean) => void;
  container3OnUVToggle: (value: boolean) => void;
  container3OnHumidToggle: (value: boolean) => void;
  container3OnTempToggle: (value: boolean) => void;
  container3InputModalTitle: (value: string) => void;
  //container 4
  container4OnInputLUXChange: (value: number) => void; // Add this prop definition
  container4OnInputUVChange: (value: number) => void;
  container4OnInputHumidChange: (value: number[]) => void;
  container4OnInputTempChange: (value: number[]) => void;
  container4OnLUXToggle: (value: boolean) => void;
  container4OnUVToggle: (value: boolean) => void;
  container4OnHumidToggle: (value: boolean) => void;
  container4OnTempToggle: (value: boolean) => void;
  container4InputModalTitle: (value: string) => void;

}
    
const Containers: React.FC<ContainersProps> = ({ container1Percent, container2Percent, container3Percent, container4Percent, 
    container1Name, container2Name, container3Name, container4Name, container1CurrMass, container2CurrMass, container3CurrMass,
    container4CurrMass, container1InitMass,  container2InitMass, container3InitMass, container4InitMass, container1LUX, 
    container2LUX, container3LUX, container4LUX, container1UV, container2UV, container3UV, container4UV, container1MaxHumid,
    container2MaxHumid, container3MaxHumid, container4MaxHumid, container1MinHumid, container2MinHumid, container3MinHumid,
    container4MinHumid, container1MaxTemp, container2MaxTemp, container3MaxTemp, container4MaxTemp, container1MinTemp,
    container2MinTemp, container3MinTemp, container4MinTemp, container1HumidBool, container2HumidBool, container3HumidBool, container4HumidBool,
    container1LUXBool, container2LUXBool, container3LUXBool, container4LUXBool, container1TempBool, container2TempBool, container3TempBool,
    container4TempBool, container1UVBool, container2UVBool, container3UVBool, container4UVBool, container1OnInputLUXChange, container1OnInputUVChange,
    container1OnInputHumidChange, container1OnInputTempChange, container1OnLUXToggle, container1OnUVToggle, container1OnHumidToggle,
    container1OnTempToggle, container2OnInputLUXChange, container2OnInputUVChange, container2OnInputHumidChange, container2OnInputTempChange,
    container2OnLUXToggle, container2OnUVToggle, container2OnHumidToggle, container2OnTempToggle, container3OnInputLUXChange,
    container3OnInputUVChange, container3OnInputHumidChange, container3OnInputTempChange, container3OnLUXToggle, container3OnUVToggle,
    container3OnHumidToggle, container3OnTempToggle, container4OnInputLUXChange, container4OnInputUVChange, container4OnInputHumidChange,
    container4OnInputTempChange, container4OnLUXToggle, container4OnUVToggle, container4OnHumidToggle, container4OnTempToggle, container1InputModalTitle,
    container2InputModalTitle, container3InputModalTitle, container4InputModalTitle
  }) => {

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
            <Container 
              containerPercent={container1Percent} 
              containerName={container1Name} 
              currentMass={container1CurrMass} 
              initialMass={container1InitMass}
              inputLUXValue={container1LUX}
              inputUVValue={container1UV}
              inputMaxHumid={container1MaxHumid}
              inputMinHumid={container1MinHumid}
              inputMaxTemp={container1MaxTemp}
              inputMinTemp={container1MinTemp}
              humidBool={container1HumidBool}
              luxBool={container1LUXBool}
              tempBool={container1TempBool}
              uvBool={container1UVBool}
              onInputLUXChange={container1OnInputLUXChange}
              onInputUVChange={container1OnInputUVChange}
              onInputHumidChange={container1OnInputHumidChange}
              onInputTempChange={container1OnInputTempChange}
              onLUXToggle={container1OnLUXToggle} 
              onUVToggle={container1OnUVToggle} 
              onHumidToggle={container1OnHumidToggle} 
              onTempToggle={container1OnTempToggle}
              inputModalTitle={container1InputModalTitle}
            />
        </Col>
        <Col span={6}>
            <Container 
              containerPercent={container2Percent} 
              containerName={container2Name} 
              currentMass={container2CurrMass}
              initialMass={container2InitMass}
              inputLUXValue={container2LUX}
              inputUVValue={container2UV}
              inputMaxHumid={container2MaxHumid}
              inputMinHumid={container2MinHumid}
              inputMaxTemp={container2MaxTemp}
              inputMinTemp={container2MinTemp}
              humidBool={container2HumidBool}
              luxBool={container2LUXBool}
              tempBool={container2TempBool}
              uvBool={container2UVBool}
              onInputLUXChange={container2OnInputLUXChange}
              onInputUVChange={container2OnInputUVChange}
              onInputHumidChange={container2OnInputHumidChange}
              onInputTempChange={container2OnInputTempChange}
              onLUXToggle={container2OnLUXToggle} 
              onUVToggle={container2OnUVToggle} 
              onHumidToggle={container2OnHumidToggle} 
              onTempToggle={container2OnTempToggle}
              inputModalTitle={container2InputModalTitle} 
            />
        </Col>
        <Col span={6}>
            <Container 
              containerPercent={container3Percent} 
              containerName={container3Name} 
              currentMass={container3CurrMass} 
              initialMass={container3InitMass}
              inputLUXValue={container3LUX}
              inputUVValue={container3UV}
              inputMaxHumid={container3MaxHumid}
              inputMinHumid={container3MinHumid}
              inputMaxTemp={container3MaxTemp}
              inputMinTemp={container3MinTemp}
              humidBool={container3HumidBool}
              luxBool={container3LUXBool}
              tempBool={container3TempBool}
              uvBool={container3UVBool}
              onInputLUXChange={container3OnInputLUXChange}
              onInputUVChange={container3OnInputUVChange}
              onInputHumidChange={container3OnInputHumidChange}
              onInputTempChange={container3OnInputTempChange}
              onLUXToggle={container3OnLUXToggle} 
              onUVToggle={container3OnUVToggle} 
              onHumidToggle={container3OnHumidToggle} 
              onTempToggle={container3OnTempToggle}
              inputModalTitle={container3InputModalTitle} 
            />
        </Col>
        <Col span={6}>
            <Container 
              containerPercent={container4Percent} 
              containerName={container4Name} 
              currentMass={container4CurrMass} 
              initialMass={container4InitMass}
              inputLUXValue={container4LUX}
              inputUVValue={container4UV}
              inputMaxHumid={container4MaxHumid}
              inputMinHumid={container4MinHumid}
              inputMaxTemp={container4MaxTemp}
              inputMinTemp={container4MinTemp}
              humidBool={container4HumidBool}
              luxBool={container4LUXBool}
              tempBool={container4TempBool}
              uvBool={container4UVBool}
              onInputLUXChange={container4OnInputLUXChange}
              onInputUVChange={container4OnInputUVChange}
              onInputHumidChange={container4OnInputHumidChange}
              onInputTempChange={container4OnInputTempChange}
              onLUXToggle={container4OnLUXToggle} 
              onUVToggle={container4OnUVToggle} 
              onHumidToggle={container4OnHumidToggle} 
              onTempToggle={container4OnTempToggle}
              inputModalTitle={container4InputModalTitle}
            />
        </Col>
      </Row>
    </div>

  );
}

export default Containers
