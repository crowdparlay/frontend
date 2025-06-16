interface FailedMessageProps {
  reaction: string;
}

export const FailedMessage = (props: FailedMessageProps) => (
  <p>
    Failed to toggle <span className="font-semibold">{props.reaction}</span>
  </p>
);
