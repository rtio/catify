function VoteButton({ vote, onClick, color, disabled }) {
  let style = { backgroundColor: color }
  if (disabled) {
    style = {
        ...style,
        filter: "grayscale(100%)"
    }
  }

  return (
    <button onClick={onClick} style={style} disabled={disabled} >
      {vote}
    </button>
  );
}

export default VoteButton;