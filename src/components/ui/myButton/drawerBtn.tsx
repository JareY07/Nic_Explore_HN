import { useAuthStore } from '@/features/auth/store/useAuth';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { LeaveIcon } from '@/components/icons/icons';
import { colors } from '@/theme/colors';

export default function CustomDrawerContent(props: any) {
  const { logOut } = useAuthStore();
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ backgroundColor: colors.primary[100] }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={'Cerrar Sesión'}
        onPress={logOut}
        pressColor={colors.status.error}
        icon={({ color, size }) => <LeaveIcon size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
}
