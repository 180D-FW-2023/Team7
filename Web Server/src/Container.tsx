import React, { useState } from 'react';
import './App.css';
import { Card, Progress } from 'antd';
import ContainerInfo from './ContainerInfo'

interface ContainerProps {
  containerPercent: number;
  containerName: string;
  initialMass: number;
  currentMass: number;
}

const Container: React.FC<ContainerProps> = ({ containerPercent, containerName, initialMass, currentMass }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  
  const handleCardClick = (title : string ) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

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
        />
    </div>
  );
}

export default Container;
