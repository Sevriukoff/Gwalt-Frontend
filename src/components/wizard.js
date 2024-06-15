'use client';

import React, { useState } from 'react';

const Wizard = ({ children }) => {
  const [history, setHistory] = useState([0]);

  const currentStep = history[history.length - 1];

  const next = (step) => {
    setHistory([...history, step]);
  };

  const previous = () => {
    setHistory(history.slice(0, history.length - 1));
  };

  const stepProps = {
    next,
    previous,
    currentStep,
  };

  const backProps = {
    previous,
    currentStep,
  };

  return (
    <div>
      { React.Children.map(children, (child, index) => {
        if (child.type === Wizard.Back) {
          return React.cloneElement(child, { ...backProps });
        }
        if (index === currentStep) {
          return React.cloneElement(child, { ...stepProps });
        }
        return null;
      }) }
    </div>
  );
};

Wizard.Step = ({ children, next }) => {
  return React.cloneElement(children, { ...children.props, next });
};

Wizard.Back = ({ children, previous, currentStep }) => {
  if (currentStep === 0) {
    return null;
  }

  return React.cloneElement(children, {
    onClick: previous,
    disabled: currentStep === 0,
  });
};

export default Wizard;