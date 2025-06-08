import React from 'react';
import Analyze from './Analyze';
import BottomNavigation from '../components/BottomNavigation';

const AnalyzeWithNav: React.FC = () => {
  return (
    <>
      <Analyze />
      <BottomNavigation />
    </>
  );
};

export default AnalyzeWithNav;