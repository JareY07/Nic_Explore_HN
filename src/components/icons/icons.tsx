import { Feather } from '@expo/vector-icons';

type IconProps = {
  color: string;
  size?: number;
};

export const HomeIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="home" size={size} color={color} />
);

export const BookIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="book-open" size={size} color={color} />
);

export const OrderIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="edit" size={size} color={color} />
);

export const UserIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="user" size={size} color={color} />
);

export const EyeOnIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="eye" size={size} color={color} />
);

export const EyeOffIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="eye-off" size={size} color={color} />
);

export const InfoIcon = ({ color, size = 16 }: IconProps) => (
  <Feather name="info" size={size} color={color} />
);

export const LeaveIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="log-out" size={size} color={color} />
);
