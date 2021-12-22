import { useState } from 'react';

export default function ToggleButton({ leftChoice, rightChoice, onChange }) {
  const [choice, setChoice] = useState(false);

  function handleButtonClick() {
    setChoice(choice => !choice);
    onChange(!choice);
  }

  return (
    <div>
      <button disabled={choice === true} onClick={handleButtonClick}>{leftChoice}</button>
      <button disabled={choice === false} onClick={handleButtonClick}>{rightChoice}</button>
    </div>
  );
}
