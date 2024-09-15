import React, { useState } from 'react';
import { Slider } from '@mui/material';  // Importing MUI Slider

type RangeSliderProps = {
  setRowsToShow: (value: number) => void;
};

const RangeSlider: React.FC<RangeSliderProps> = ({ setRowsToShow }) => {
  const [sliderValue, setSliderValue] = useState(10);

  const handleSliderChange = (event: Event, value: number | number[]) => {
    setSliderValue(value as number);
  };

  const handleMouseUp = () => {
    setRowsToShow(sliderValue);
  };

  return (
    <div>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleMouseUp}  // Fires after mouse is released
        min={5}
        max={20}
        step={1}
      />
      <p>Rows to show: {sliderValue}</p>
    </div>
  );
};

export default RangeSlider;
