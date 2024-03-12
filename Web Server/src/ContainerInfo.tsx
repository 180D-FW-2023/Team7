import React, { useState, useEffect } from 'react';
import { Modal, Progress, Col, Row, Switch, Slider } from 'antd';
import { sendContainerDataToFirebase } from './firebaseService';
import './ContainerInfo.css'

interface ContainerInfoProps {
    visible: boolean;
    onCancel: () => void;
    title: string;
    containerPercent: number;
    initialMass: number;
    currentMass: number;
    initialInputLUXValue: number;
    initialInputUVValue: number;
    initialInputMaxHumid: number;
    initialInputMinHumid: number;
    initialInputMaxTemp: number;
    initialInputMinTemp: number;
    initialHumidBool: boolean;
    initialLUXBool: boolean;
    initialTempBool: boolean;
    initialUVBool: boolean;
    onInputLUXChange: (value: number) => void; // Add this prop definition
    onInputUVChange: (value: number) => void;
    onInputHumidChange: (value: number[]) => void;
    onInputTempChange: (value: number[]) => void;
    onLUXToggle: (value: boolean) => void;
    onUVToggle: (value: boolean) => void;
    onHumidToggle: (value: boolean) => void;
    onTempToggle: (value: boolean) => void;
}

const ContainerInfo: React.FC<ContainerInfoProps> = ({ visible, onCancel, title, containerPercent, initialMass, currentMass, initialInputLUXValue, initialInputUVValue, 
    initialInputMaxHumid, initialInputMinHumid, initialInputMaxTemp, initialInputMinTemp, initialHumidBool, initialLUXBool, initialTempBool,
    initialUVBool,
    onInputLUXChange, onInputUVChange, onInputHumidChange, onInputTempChange, onLUXToggle, onUVToggle, onHumidToggle, onTempToggle
     }) => { //add onInputLUXChange back into params
    // let initialLUXToggleState: boolean = false;
    // let initialUVToggleState: boolean = false;
    // let initialHumidToggleState: boolean = false;
    // let initialTempToggleState: boolean = false;

    // if (initialInputLUXValue > 0)
    // {
    //     initialLUXToggleState = true;
    // }

    // if (initialInputUVValue > 0)
    // {
    //     initialUVToggleState = true;
    // }

    // if (initialInputMaxHumid > 0 || initialInputMinHumid > 0)
    // {
    //     initialHumidToggleState= true;
    // }

    // if(initialInputMaxTemp > 0 || initialInputMinTemp > 0)
    // {
    //     initialTempToggleState = true;
    // }


    const [inputLUXValue, setInputLUXValue] = useState(initialInputLUXValue);
    const [inputUVValue, setInputUVValue] = useState(initialInputUVValue);
    const [inputHumidValue, setInputHumidValue] = useState<number[]>([initialInputMinHumid, initialInputMaxHumid]);
    const [inputTempValue, setInputTempValue] = useState<number[]>([initialInputMinTemp, initialInputMaxTemp]);
    const [toggleLUX, setToggleLUX] = useState(initialLUXBool);
    const [toggleUV, setToggleUV] = useState(initialUVBool);
    const [toggleHumidity, setToggleHumidity] = useState(initialHumidBool);
    const [toggleTemperature, setToggleTemperature] = useState(initialTempBool);


    // const [inputData, setInputData] = useState('');

    // Function to handle input change
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputData(event.target.value);
    // };

    // console.log("hello", initialInputLUXValue);

    const handleLUXToggle = (checked: boolean) => {
        setToggleLUX(checked);
        onLUXToggle(checked);
        // if (toggleLUX)
        // {
        //     setInputLUXValue(0);
        //     onInputLUXChange(0);
        // }
    };

    const handleUVToggle = (checked: boolean) => {
        setToggleUV(checked);
        onUVToggle(checked);
        // if(toggleUV)
        // {
        //     setInputUVValue(0);
        //     onInputUVChange(0);
        // }
    }

    const handleHumidityToggle = (checked: boolean) => {
        setToggleHumidity(checked);
        onHumidToggle(checked);
        // if(toggleHumidity)
        // {
        //     setInputHumidValue([0, 0]);
        //     onInputHumidChange([0, 0]);
        // }
    }

    const handleTemperaturetoggle = (checked: boolean) => {
        setToggleTemperature(checked);
        onTempToggle(checked);
        // if(toggleTemperature)
        // {
        //     setInputTempValue([0, 0]);
        //     onInputTempChange([0, 0]);
        // }
    }

    const onLUXChange = (newValue: number | null) => {
        if (typeof newValue === 'number') {
            setInputLUXValue(newValue);
            onInputLUXChange(newValue); // Call the callback function
        }
    };
    const onUVChange = (newValue: number | null) => {
        if (typeof newValue === 'number') {
            setInputUVValue(newValue);
            onInputUVChange(newValue);
        }
    };

    const onHumidChange = (newValue: number | number[] ) => {
        // console.log("logging", newValue)
        // setInputHumidValue(newValue);
        if (typeof newValue === 'number') {
            setInputHumidValue([newValue]);
            onInputHumidChange([newValue]);
            // console.log("went thru == number", newValue)
        } else {
            setInputHumidValue(newValue);
            onInputHumidChange(newValue);
            // console.log("went thru else statement", newValue)
        }
    }

    const onTempChange = (newValue: number | number[] ) => {
        // console.log("logging", newValue)
        // setInputHumidValue(newValue);
        if (typeof newValue === 'number') {
            setInputTempValue([newValue]);
            onInputTempChange([newValue]);
            // console.log("went thru == number", newValue)
        } else {
            setInputTempValue(newValue);
            onInputTempChange(newValue);
            // console.log("went thru else statement", newValue)
        }
    }


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // Here, send the data to Firebase
    //         // sendDataToFirebase(inputLUXValue, inputUVValue, 16, 4, 80, 12);
            
    //     }, 15000); // 15 seconds interval

    //     return () => clearInterval(interval); // Clear interval on component unmount
    // }, [inputLUXValue, inputUVValue]);
    // setInputValue(newValue);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={title}
      footer={null}
      className="modaltitle"
    >
    <div>
        <div className="modal-first-body">
            <Row gutter={[16,16]}>
                <Col span={12}>
                    <Progress type="circle" percent={containerPercent} format={(percent) => `${percent}%`} />
                </Col>
                <Col span={12}>
                    <p>Initial Mass: {initialMass} g</p>
                    <p>Current Mass: {currentMass} g</p>
                </Col>
            </Row>
        </div>
        <p className="modal-subtitle">
            Environment Requirements
        </p>
        
        <Row gutter={[16, 16]}>
            <Col span={6} className="checkbox">
                <Switch checked={toggleLUX} onChange={handleLUXToggle}/>
            </Col>
            <Col span={8} className="checkbox-name">
                Max LUX
            </Col>
            <Col span={10} className="slider">
                <Slider
                min={0}
                max={100}
                onChange={onLUXChange}
                value={typeof inputLUXValue === 'number' ? inputLUXValue : 0}
                //need !toggleLUX due to the switch being checked. AKA if toggleLUX is true (meaning toggle is on), then disabled will be false (not true)
                disabled={!toggleLUX}
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={6} className="checkbox">
                <Switch checked={toggleUV} onChange={handleUVToggle}/>
            </Col>
            <Col span={8} className="checkbox-name">
                Max UV
            </Col>
            <Col span={10} className="slider">
                <Slider
                min={0}
                max={100}
                onChange={onUVChange}
                value={typeof inputUVValue === 'number' ? inputUVValue : 0}
                disabled={!toggleUV}
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={6} className="checkbox">
                <Switch checked={toggleHumidity} onChange={handleHumidityToggle}/>
            </Col>
            <Col span={8} className="checkbox-name">
                Max/Min Humidity
            </Col>
            <Col span={10} className="slider">
                <Slider
                //use code at bottom
                range
                min={0}
                max={100}
                onChange={onHumidChange}
                value={inputHumidValue}
                disabled={!toggleHumidity}
                />
            </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col span={6} className="checkbox">
                <Switch checked={toggleTemperature} onChange={handleTemperaturetoggle}/>
            </Col>
            <Col span={8} className="checkbox-name">
                Max/Min Temperature
            </Col>
            <Col span={10} className="slider">
                <Slider
                range={true}
                min={0}
                max={100}
                onChange={onTempChange}
                value={inputTempValue}
                disabled={!toggleTemperature}
                />
            </Col>
        </Row>
    </div>
    
    </Modal>
  );
};

export default ContainerInfo;


// import React from 'react';
// import { Slider } from 'antd';

// const onChange = (value: number | number[]) => {
//   console.log('onChange: ', value);
// };

// const onChangeComplete = (value: number | number[]) => {
//   console.log('onChangeComplete: ', value);
// };

// const App: React.FC = () => (
//   <>
//     <Slider defaultValue={30} onChange={onChange} onChangeComplete={onChangeComplete} />
//     <Slider
//       range
//       step={10}
//       defaultValue={[20, 50]}
//       onChange={onChange}
//       onChangeComplete={onChangeComplete}
//     />
//   </>
// );

// export default App;
