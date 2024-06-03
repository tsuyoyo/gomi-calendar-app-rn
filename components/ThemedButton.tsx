import { appColors } from '@/styles/appColors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import { ThemedText } from './ThemedText';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 48,
  },
});

const buttonStyles = StyleSheet.create({
  fillPrimary: {
    ...styles.button,
    backgroundColor: appColors.primary,
  },
  outlinePrimary: {
    ...styles.button,
    backgroundColor: 'white',
  },
});

const textStyles = StyleSheet.create({
  fillPrimary: {
    color: 'white',
  },
  outlinePrimary: {
    color: appColors.primary,
  },
  disabled: {
    color: 'grey',
  },
});

type ButtonType = 'filledPrimary' | 'outlinePrimary';

type Props = TouchableOpacityProps & {
  type: ButtonType;
  text: string;
};

const getButtonTheme = (type: ButtonType) => {
  switch (type) {
    case 'filledPrimary':
      return {
        button: buttonStyles.fillPrimary,
        text: textStyles.fillPrimary,
      };
    case 'outlinePrimary':
      return {
        button: buttonStyles.outlinePrimary,
        text: textStyles.outlinePrimary,
      };
  }
};

export const ThemedButton: React.FC<Props> = ({
  type,
  text,
  onPress,
  style,
  disabled,
  ...props
}) => {
  const theme = getButtonTheme(type);
  const buttonTheme = disabled ? styles.button : theme.button;
  const textTheme = disabled ? textStyles.disabled : theme.text;
  return (
    <TouchableOpacity
      style={{ ...(style as object), ...buttonTheme }}
      onPress={onPress}
      {...props}
    >
      <ThemedText type="defaultSemiBold" style={textTheme}>
        {text}
      </ThemedText>
    </TouchableOpacity>
  );
};
