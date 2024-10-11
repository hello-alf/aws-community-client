import React from "react";

export default function ColorSlider(props) {
  const { color, label, rgbValues, setRgbValues } = props;

  const updateColor = (color, value) => {
    setRgbValues(color, value);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {rgbValues[color]}
        </span>
      </div>
      <input
        type="range"
        id="slider"
        name="slider"
        min="0"
        max="255"
        value={[rgbValues[color]]}
        onChange={(e) => updateColor(color, Number(e.target.value))}
        className={`${
          color === "red"
            ? "bg-red-200 w-full cursor-pointer"
            : color === "green"
            ? "bg-green-200 w-full cursor-pointer"
            : "bg-blue-200 w-full cursor-pointer"
        }`}
      />
    </div>
  );
}
