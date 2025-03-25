export default function Square(value: {
  value: string | null;
  onSquareClick: () => void;
}) {
  return (
    <button className="square" onClick={value.onSquareClick}>
      {value.value}
    </button>
  );
}
