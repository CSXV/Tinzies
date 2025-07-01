interface Die {
  id: string;
  value: number;
  isHeld: boolean;
  onClick: (id: string) => void;
}

function Dice({ id, value, isHeld, onClick }: Die) {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };

  return (
    <button
      style={styles}
      className="die-button"
      onClick={() => onClick(id)}
      aria-label={`Die with value ${value}, ${isHeld ? "Held" : "not held"}`}
      aria-pressed={isHeld}
    >
      {value}
    </button>
  );
}

export default Dice;
