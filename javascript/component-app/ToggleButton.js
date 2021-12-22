import { useState } from 'react';

export default function ToggleButton({ leftChoice, rightChoice, onChange }) {
  const [choice, setChoice] = useState();

  function handleButtonClick() {
    setChoice(choice => !choice);
    onChange(!choice);
  }

  return (
    <div>
      <button disabled={choice} onClick={handleButtonClick}>{leftChoice}</button>
      <button disabled={!choice} onClick={handleButtonClick}>{rightChoice}</button>
    </div>
  );
}
