import React, { useState } from 'react';
import { Modal, Progress, Col, Row, Switch, Slider } from 'antd';
import './ContainerInfo.css'

interface ContainerInfoProps {
    visible: boolean;
    onCancel: () => void;
    title: string;
    containerPercent: number;
    initialMass: number;
    currentMass: number;
}

const ContainerInfo: React.FC<ContainerInfoProps> = ({ visible, onCancel, title, containerPercent, initialMass, currentMass }) => {
    const [inputLUXValue, setInputLUXValue] = useState(0);
    const [inputUVValue, setInputUVValue] = useState(0);
    const [toggleLUX, setToggleLUX] = useState(false);
    const [toggleUV, setToggleUV] = useState(false);
    const [toggleHumidity, setToggleHumidity] = useState(false);
    const [toggleTemperature, setToggleTemperature] = useState(false);

    const handleLUXToggle = (checked: boolean) => {
        setToggleLUX(checked);
    };

    const handleUVToggle = (checked: boolean) => {
        setToggleUV(checked);
    }

    const handleHumidityToggle = (checked: boolean) => {
        setToggleHumidity(checked);
    }

    const handleTemperaturetoggle = (checked: boolean) => {
        setToggleTemperature(checked);
    }

    const onLUXChange = (newValue: number | null) => {
        if (typeof newValue === 'number') {
            setInputLUXValue(newValue);
        }
    };
    const onUVChange = (newValue: number | null) => {
        if (typeof newValue === 'number') {
            setInputUVValue(newValue);
        }
    };
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
                range
                min={0}
                max={100}
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
                disabled={!toggleTemperature}
                />
            </Col>
        </Row>
    </div>
    
    </Modal>
  );
};

export default ContainerInfo;
