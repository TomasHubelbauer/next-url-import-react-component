export default function ToggleButton({ leftChoice, rightChoice, choice, onChange }) {
  function handleButtonClick() {
    onChange(!choice);
  }

  return (
    <div>
      <button disabled={choice} onClick={handleButtonClick}>{leftChoice}</button>
      <button disabled={!choice} onClick={handleButtonClick}>{rightChoice}</button>
    </div>
  );
}
