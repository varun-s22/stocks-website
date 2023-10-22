import "../styles/Chip.css";
interface ChipProps {
  label: string;
  value: string;
}

export default function Chip({ label, value }: ChipProps) {
  return (
    <div className="chip">
      <div className="chip-label">{label + ": "}</div>
      <div className="chip-value">{value}</div>
    </div>
  );
}
