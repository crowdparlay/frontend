interface FailedMessageProps {
  reaction: string;
}

export const FailedMessage = (props: FailedMessageProps) => {
  const {reaction} = props;

  return (
    <p>
      Failed to toggle <span className="font-semibold">{reaction}</span>
    </p>
  );
};
