export default function TricolorBar() {
  return (
    <div
      className="h-1 w-full"
      style={{
        background:
          "linear-gradient(to right, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)",
      }}
      aria-hidden="true"
    />
  );
}
