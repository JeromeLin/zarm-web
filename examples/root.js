import React from 'react';
import { hashHistory, Router } from 'react-router';
import rootRoute from './routes';

const root = () => {
  return (
    <div>
      <Router routes={rootRoute} history={hashHistory} key={Math.random()}/>
    </div>
  );
};

export default root;
