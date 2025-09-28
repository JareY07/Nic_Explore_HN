export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'glass' | 'text-gray';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  className?: string;
  textClassName?: string;
  icon?: React.ReactNode;
}
