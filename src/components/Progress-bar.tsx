import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface ProgressBarProps {
  progress: number;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress }) => {
  return <ProgressBar now={progress} label={`${progress}%`} />;
};

export default ProgressBarComponent;
