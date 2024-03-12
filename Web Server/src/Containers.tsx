import React, { useState, useEffect } from 'react';
import './App.css';
import { Row, Col} from 'antd';
import Container from './Container';
import { sendContainerDataToFirebase } from './firebaseService';

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
}

interface AllContainerData {
  containerID: string;
  inputLUXValue: number;
  inputUVValue: number;
  inputMaxHumid: number;
  inputMinHumid: number;
  inputMaxTemp: number;
  inputMinTemp: number;
  inputLUXBool: boolean;
  inputUVBool: boolean;
  inputHumidBool: boolean;
  inputTempBool: boolean;
}
    
const Containers: React.FC<ContainersProps> = ({ container1Percent, container2Percent, container3Percent, container4Percent, 
    container1Name, container2Name, container3Name, container4Name, container1CurrMass, container2CurrMass, container3CurrMass,
    container4CurrMass, container1InitMass,  container2InitMass, container3InitMass, container4InitMass, container1LUX, 
    container2LUX, container3LUX, container4LUX, container1UV, container2UV, container3UV, container4UV, container1MaxHumid,
    container2MaxHumid, container3MaxHumid, container4MaxHumid, container1MinHumid, container2MinHumid, container3MinHumid,
    container4MinHumid, container1MaxTemp, container2MaxTemp, container3MaxTemp, container4MaxTemp, container1MinTemp,
    container2MinTemp, container3MinTemp, container4MinTemp, container1HumidBool, container2HumidBool, container3HumidBool, container4HumidBool,
    container1LUXBool, container2LUXBool, container3LUXBool, container4LUXBool, container1TempBool, container2TempBool, container3TempBool,
    container4TempBool, container1UVBool, container2UVBool, container3UVBool, container4UVBool
  }) => {
  const [containerData, setContainerData] = useState<AllContainerData[]>([
    { 
      containerID: "Container_1", inputLUXValue: container1LUX, inputUVValue: container1UV, inputMaxHumid: container1MaxHumid, 
      inputMinHumid: container1MinHumid, inputMaxTemp: container1MaxTemp, inputMinTemp: container1MinTemp,
      inputLUXBool: container1LUXBool, inputUVBool: container1UVBool, inputHumidBool: container1HumidBool, inputTempBool: container1TempBool
    },
    { 
      containerID: "Container_2", inputLUXValue: container2LUX, inputUVValue: container2UV, inputMaxHumid: container2MaxHumid, 
      inputMinHumid: container2MinHumid, inputMaxTemp: container2MaxTemp, inputMinTemp: container2MinTemp,
      inputLUXBool: container2LUXBool, inputUVBool: container2UVBool, inputHumidBool: container2HumidBool, inputTempBool: container2TempBool
    },
    { 
      containerID: "Container_3", inputLUXValue: container3LUX, inputUVValue: container3UV, inputMaxHumid: container3MaxHumid, 
      inputMinHumid: container3MinHumid, inputMaxTemp: container3MaxTemp, inputMinTemp: container3MinTemp,
      inputLUXBool: container3LUXBool, inputUVBool: container3UVBool, inputHumidBool: container3HumidBool, inputTempBool: container3TempBool
    },
    { 
      containerID: "Container_4", inputLUXValue: container4LUX, inputUVValue: container4UV, inputMaxHumid: container4MaxHumid, 
      inputMinHumid: container4MinHumid, inputMaxTemp: container4MaxTemp, inputMinTemp: container4MinTemp,
      inputLUXBool: container4LUXBool, inputUVBool: container4UVBool, inputHumidBool: container4HumidBool, inputTempBool: container4TempBool
    },
  ]);

  const handleInputLUXChange = (containerID: string, luxValue: number) => {
    setContainerData(prevData => {
        const updatedData = prevData.map(container => {
            if (container.containerID === containerID) {
                return { ...container, inputLUXValue: luxValue };
            }
            return container;
        });
        return updatedData;
    });
  };

  const handleInputUVChange = (containerID: string, uvValue: number) => {
    setContainerData(prevData => {
        const updatedData = prevData.map(container => {
            if (container.containerID === containerID) {
                return { ...container, inputUVValue: uvValue };
            }
            return container;
        });
        return updatedData;
    });
  };

  const handleInputHumidChange = (containerID: string, minHumid: number, maxHumid: number) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputMaxHumid: maxHumid, inputMinHumid: minHumid };
          }
          return container;
      });
      return updatedData;
    });
  };

  const handleInputTempChange = (containerID: string, minTemp: number, maxTemp: number) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputMaxTemp: maxTemp, inputMinTemp: minTemp };
          }
          return container;
      });
      return updatedData;
    });
  };

  const handleLUXToggle = (containerID: string, luxBool: boolean) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputLUXBool: luxBool };
          }
          return container;
      });
      return updatedData;
    });
  };
  
  const handleUVToggle = (containerID: string, uvBool: boolean) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputUVBool: uvBool };
          }
          return container;
      });
      return updatedData;
    });
  };

  const handleHumidToggle = (containerID: string, humidBool: boolean) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputHumidBool: humidBool };
          }
          return container;
      });
      return updatedData;
    });
  };

  const handleTempToggle = (containerID: string, tempBool: boolean) => {
    setContainerData(prevData => {
      const updatedData = prevData.map(container => {
          if (container.containerID === containerID) {
              return { ...container, inputTempBool: tempBool };
          }
          return container;
      });
      return updatedData;
    });
  };
  // console.log("container1: ", container1MinHumid, container1MaxHumid)
  // console.log("container2: ", container2MinHumid, container2MaxHumid)
  // console.log("container3: ", container3MinHumid, container3MaxHumid)
  // console.log("container4: ", container4MinHumid, container4MaxHumid)

  // console.log(containerData);

  useEffect(() => {
    sendContainerDataToFirebase(containerData);
  }, [containerData]);


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
              onInputLUXChange={(value) => handleInputLUXChange("Container_1", value)}
              onInputUVChange={(value) => handleInputUVChange("Container_1", value)}
              onInputHumidChange={([value1, value2]) => handleInputHumidChange("Container_1", value1, value2)}
              onInputTempChange={([value1, value2]) => handleInputTempChange("Container_1", value1, value2)}
              onLUXToggle={(value) => handleLUXToggle("Container_1", value)} 
              onUVToggle={(value) => handleUVToggle("Container_1", value)} 
              onHumidToggle={(value) => handleHumidToggle("Container_1", value)} 
              onTempToggle={(value) => handleTempToggle("Container_1", value)} 
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
              onInputLUXChange={(value) => handleInputLUXChange("Container_2", value)}
              onInputUVChange={(value) => handleInputUVChange("Container_2", value)}
              onInputHumidChange={([value1, value2]) => handleInputHumidChange("Container_2", value1, value2)}
              onInputTempChange={([value1, value2]) => handleInputTempChange("Container_2", value1, value2)}
              onLUXToggle={(value) => handleLUXToggle("Container_2", value)} 
              onUVToggle={(value) => handleUVToggle("Container_2", value)} 
              onHumidToggle={(value) => handleHumidToggle("Container_2", value)} 
              onTempToggle={(value) => handleTempToggle("Container_2", value)} 
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
              onInputLUXChange={(value) => handleInputLUXChange("Container_3", value)}
              onInputUVChange={(value) => handleInputUVChange("Container_3", value)}
              onInputHumidChange={([value1, value2]) => handleInputHumidChange("Container_3", value1, value2)}
              onInputTempChange={([value1, value2]) => handleInputTempChange("Container_3", value1, value2)}
              onLUXToggle={(value) => handleLUXToggle("Container_3", value)} 
              onUVToggle={(value) => handleUVToggle("Container_3", value)} 
              onHumidToggle={(value) => handleHumidToggle("Container_3", value)} 
              onTempToggle={(value) => handleTempToggle("Container_3", value)} 
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
              onInputLUXChange={(value) => handleInputLUXChange("Container_4", value)}
              onInputUVChange={(value) => handleInputUVChange("Container_4", value)}
              onInputHumidChange={([value1, value2]) => handleInputHumidChange("Container_4", value1, value2)}
              onInputTempChange={([value1, value2]) => handleInputTempChange("Container_4", value1, value2)}
              onLUXToggle={(value) => handleLUXToggle("Container_4", value)} 
              onUVToggle={(value) => handleUVToggle("Container_4", value)} 
              onHumidToggle={(value) => handleHumidToggle("Container_4", value)} 
              onTempToggle={(value) => handleTempToggle("Container_4", value)}
            />
        </Col>
      </Row>
    </div>

  );
}

export default Containers
