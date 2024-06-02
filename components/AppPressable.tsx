import { PressableProps, Pressable } from 'react-native';
import { appColors } from '@/styles/appColors';

export const AppPressable: React.FC<PressableProps> = ({
  children,
  ...props
}) => {
  return (
    <Pressable
      android_ripple={{ color: appColors.rippleColor }}
      {...props}
    >
      {children}
    </Pressable>
  );
};
