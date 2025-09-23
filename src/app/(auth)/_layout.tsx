import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="emailSend"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="codeSend"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
