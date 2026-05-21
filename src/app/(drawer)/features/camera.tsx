import { CameraActionIcon, ToggleCameraIcon } from '@/components/icons/icons';
import IconButton from '@/components/ui/myButton/iconButton';
import PhotoPreviewSection from '@/features/features/components/photoPreviewSection';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme/colors';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { APP_STRINGS } from '@/constants/shared';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const { theme } = useAppStore();

  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>{APP_STRINGS.CAMERA.NEED_PERMISSION}</Text>
        <TouchableOpacity style={styles.grantButton} onPress={requestPermission}>
          <Text style={styles.grantButtonText}>{APP_STRINGS.CAMERA.GRANT_PERMISSION}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((c) => (c === 'back' ? 'front' : 'back'));
  };

  // Ajustables
  const frameSize = Math.min(Dimensions.get('window').width * 0.6, 360); // tamaño del recuadro central
  const cornerSize = 35; // tamaño de la "curva" de cada esquina
  const borderThickness = 5; // grosor de la línea blanca
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.08] });

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takedPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takedPhoto);
    }
  };

  const handleReTakedPhoto = () => setPhoto(null);

  if (photo) return <PhotoPreviewSection photo={photo} handleRetakePhoto={handleReTakedPhoto} />;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />

      {/* Overlay semi-oscuro */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.maskTop, { height: '12%' }]} />
        <View style={[styles.maskBottom, { height: '18%' }]} />

        {/* Centro donde va el recuadro */}
        <View style={styles.centerContainer}>
          <View style={styles.hintWrapper}>
            <Text style={styles.hint}>{APP_STRINGS.CAMERA.HINT}</Text>
          </View>

          <View style={[styles.frameArea, { width: frameSize, height: frameSize }]}>
            {/* Anillo sutil (pulse) detrás de las esquinas */}
            <Animated.View
              style={[
                styles.pulse,
                {
                  width: frameSize + 60,
                  height: frameSize + 60,
                  borderRadius: frameSize,
                  transform: [{ scale: pulseScale }],
                  opacity: pulseOpacity,
                },
              ]}
            />

            {/* Cuatro esquinas curvas blancas */}
            <View
              style={[
                styles.cornerBase,
                styles.cornerTopLeft,
                {
                  width: cornerSize,
                  height: cornerSize,
                  borderRadius: cornerSize - 30,
                  borderWidth: borderThickness,
                  left: -cornerSize / 2,
                  top: -cornerSize / 2,
                },
              ]}
            />
            <View
              style={[
                styles.cornerBase,
                styles.cornerTopRight,
                {
                  width: cornerSize,
                  height: cornerSize,
                  borderRadius: cornerSize - 30,
                  borderWidth: borderThickness,
                  right: -cornerSize / 2,
                  top: -cornerSize / 2,
                },
              ]}
            />
            <View
              style={[
                styles.cornerBase,
                styles.cornerBottomLeft,
                {
                  width: cornerSize,
                  height: cornerSize,
                  borderRadius: cornerSize - 30,
                  borderWidth: borderThickness,
                  left: -cornerSize / 2,
                  bottom: -cornerSize / 2,
                },
              ]}
            />
            <View
              style={[
                styles.cornerBase,
                styles.cornerBottomRight,
                {
                  width: cornerSize,
                  height: cornerSize,
                  borderRadius: cornerSize - 30,
                  borderWidth: borderThickness,
                  right: -cornerSize / 2,
                  bottom: -cornerSize / 2,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Controles inferiores */}
      <View style={styles.buttonContainer}>
        <IconButton
          onPress={handleTakePhoto}
          icon={
            <CameraActionIcon
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral.black}
            />
          }
          variant="secondary"
        />
        <IconButton
          onPress={toggleCameraFacing}
          icon={
            <ToggleCameraIcon
              color={theme === 'dark' ? colors.neutral[300] : colors.neutral.black}
            />
          }
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },

  centeredContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  message: { textAlign: 'center', paddingBottom: 10, color: '#fff', fontSize: 16 },
  grantButton: { alignSelf: 'center', backgroundColor: '#2563eb', padding: 12, borderRadius: 8 },
  grantButtonText: { color: '#fff', fontWeight: '600' },

  // máscaras superior/inferior
  maskTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  maskBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '14%',
    bottom: '18%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  hintWrapper: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 28,
  },
  hint: { color: 'rgba(255,255,255,0.9)', fontSize: 15 },

  frameArea: {
    alignItems: 'center',
    justifyContent: 'center',
    // no dibujamos borde completo, sólo esquinas
    backgroundColor: 'transparent',
  },

  // pulso sutil
  pulse: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'transparent',
  },

  // base para las cuatro esquinas
  cornerBase: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },

  // cada estilo de esquina desactiva dos lados del borde para dejar visible sólo la curva deseada
  cornerTopLeft: {
    // dejamos borderTop y borderLeft visibles; quitamos right/bottom
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTopRight: {
    // dejamos borderTop y borderRight visibles
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  cornerBottomLeft: {
    // dejamos borderBottom y borderLeft visibles
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  cornerBottomRight: {
    // dejamos borderBottom y borderRight visibles
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: { flex: 1, alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '700', color: 'white' },
});
