"use client";
import React, { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import ColorSlider from "../slider/color";
import rgbToHex from "../../tools/rgb";
import useIoT from "../../hooks/iot";

export default function Main() {
  const [rgbValues, setRgbValues] = useState({
    red: 255,
    green: 255,
    blue: 255,
  });
  const { connected, publishRGBValues } = useIoT();

  // useEffect(() => {
  //   const eventSource = new EventSource("/api/iot");

  //   eventSource.onmessage = (event) => {
  //     const newMessage = JSON.parse(event.data);
  //     console.log("newMessage", newMessage);
  //     // setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   };

  //   eventSource.onerror = (err) => {
  //     console.error("Error en SSE", err);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  const handleRGBChange = (color, value) => {
    setRgbValues((prevValues) => ({
      ...prevValues,
      [color]: value,
    }));

    publishRGBValues(rgbValues.red, rgbValues.green, rgbValues.blue);
  };

  const ledColor = rgbToHex(rgbValues.red, rgbValues.green, rgbValues.blue);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
        <Circle size={100} fill={ledColor} stroke={ledColor} />
        <div className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          Color hexadecimal actual:{" "}
          <span className="font-bold text-lg">{ledColor}</span>
        </div>
      </div>

      <ColorSlider
        color="red"
        label="Red"
        rgbValues={rgbValues}
        setRgbValues={handleRGBChange}
      />
      <ColorSlider
        color="green"
        label="Green"
        rgbValues={rgbValues}
        setRgbValues={handleRGBChange}
      />
      <ColorSlider
        color="blue"
        label="Blue"
        rgbValues={rgbValues}
        setRgbValues={handleRGBChange}
      />
    </>
  );
}
