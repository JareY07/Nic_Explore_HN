import React from 'react';
import { Feather } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface IconProps {
  color?: string;
  size?: number;
}
export const HomeIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="home" size={size} color={color} />
);

export const LikedIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="heart" size={size} color={color} />
);

export const TrashIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="trash" size={size} color={color} />
);

export const HeartFilledIcon = ({ color, size = 24 }: IconProps) => (
  <FontAwesome name="heart" size={size} color={color} />
);

export const HeartEmptyIcon = ({ color, size = 24 }: IconProps) => (
  <FontAwesome name="heart-o" size={size} color={color} />
);

export const EditIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="edit" size={size} color={color} />
);

export const UserIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="user" size={size} color={color} />
);

export const EyeOnIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="eye" size={size} color={color} />
);

export const SearchIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="search" size={size} color={color} />
);

export const CameraIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="camera" size={size} color={color} />
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

export const SettingsIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="settings" size={size} color={color} />
);

export const LockIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="lock" size={size} color={color} />
);

export const CreditCardIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="credit-card" size={size} color={color} />
);

export const BellIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="bell" size={size} color={color} />
);

export const GlobeIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="globe" size={size} color={color} />
);

export const MoonIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="moon" size={size} color={color} />
);

export const HelpIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="help-circle" size={size} color={color} />
);

export const AddIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="plus" size={size} color={color} />
);

export const ArrowLeftIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="chevron-left" size={size} color={color} />
);

export const ChevronDownIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="chevron-down" size={size} color={color} />
);

export const ChevronUpIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="chevron-up" size={size} color={color} />
);

export const CheckIcon = ({ color, size = 24 }: IconProps) => (
  <Feather name="check-circle" size={size} color={color} />
);

export const XIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome6 name="x-twitter" size={size} color={color} />
);

export const FacebookIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome5 name="facebook" size={size} color={color} />
);

export const AppleIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome5 name="apple" size={size} color={color} />
);

export const GoogleIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome5 name="google" size={size} color={color} />
);

export const CameraActionIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome6 name="camera" size={size} color={color} />
);

export const ToggleCameraIcon = ({ color, size = 32 }: IconProps) => (
  <FontAwesome6 name="camera-rotate" size={size} color={color} />
);
