import React, { useState } from 'react';
import './App.css';
import { Card, Progress } from 'antd';
import ContainerInfo from './ContainerInfo'

interface ContainerProps {
  containerPercent: number;
  containerName: string;
  initialMass: number;
  currentMass: number;
  inputLUXValue: number; // Accept inputLUXValue as prop
  inputUVValue: number;
  inputMaxHumid: number;
  inputMinHumid: number;
  inputMaxTemp: number;
  inputMinTemp: number;
  humidBool: boolean;
  luxBool: boolean;
  tempBool: boolean;
  uvBool: boolean;
  onInputLUXChange: (value: number) => void; // Accept callback function
  onInputUVChange: (value: number) => void;
  onInputHumidChange: (value: number[]) => void;
  onInputTempChange: (value: number[]) => void;
  onLUXToggle: (value: boolean) => void;
  onUVToggle: (value: boolean) => void;
  onHumidToggle: (value: boolean) => void;
  onTempToggle: (value: boolean) => void;
}

const Container: React.FC<ContainerProps> = ({ containerPercent, containerName, initialMass, currentMass, inputLUXValue, inputUVValue, inputMaxHumid,
  inputMinHumid, inputMaxTemp, inputMinTemp, humidBool, luxBool, tempBool, uvBool,
  onInputLUXChange, onInputUVChange, onInputHumidChange, onInputTempChange, onLUXToggle, onUVToggle, onHumidToggle, onTempToggle
  }) => {//add onInputLUXChange back into params
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  // const [inputLUXValue, setInputLUXValue] = useState(0);
  
  const handleCardClick = (title : string ) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  // console.log("hello2", inputLUXValue);
  // const handleInputLUXChange = (value: number) => {
  //   setInputLUXValue(value); // Update inputLUXValue
  // };

  return (
    <div>
      <Card headStyle={{border: 'none'}} title={containerName} onClick={() => handleCardClick(containerName)}>
        <Progress type="circle" percent={containerPercent} format={(percent) => `${percent}%`}/>
      </Card>
      <ContainerInfo 
        visible={modalVisible}
        onCancel={handleModalCancel}
        title={modalTitle}
        containerPercent={containerPercent}
        initialMass={initialMass}
        currentMass={currentMass}
        initialInputLUXValue={inputLUXValue}
        initialInputUVValue={inputUVValue}
        initialInputMaxHumid={inputMaxHumid}
        initialInputMinHumid={inputMinHumid}
        initialInputMaxTemp={inputMaxTemp}
        initialInputMinTemp={inputMinTemp}
        initialHumidBool={humidBool}
        initialLUXBool={luxBool}
        initialTempBool={tempBool}
        initialUVBool={uvBool}
        onInputLUXChange={onInputLUXChange} // Pass the callback function
        onInputUVChange={onInputUVChange}
        onInputHumidChange={onInputHumidChange}
        onInputTempChange={onInputTempChange}
        onLUXToggle={onLUXToggle}
        onUVToggle={onUVToggle}
        onHumidToggle={onHumidToggle}
        onTempToggle={onTempToggle}
        />
    </div>
  );
}

export default Container;
