type Variant = "blue" | "green" | "lavender" | "gold";

type Props = {
  children: React.ReactNode;
  variant: Variant;
};

export default function Highlight({ children, variant }: Props) {
  return <mark className={`mark-${variant}`}>{children}</mark>;
}
