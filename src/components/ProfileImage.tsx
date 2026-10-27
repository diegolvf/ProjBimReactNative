import React, { useMemo } from 'react';
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { useTheme } from '../theme/LoadTheme';
import { Colors } from '../theme/colors';

type Props = { source: ImageSourcePropType; isHome?: boolean; };


export default function ProfileImage({ source, isHome = false }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => criarStyles(colors), [colors]);

  return (
    // Se for Home, usa um wrapper simples. Senão, usa o wrapper de 86%.
    <View style={isHome ? styles.homeWrapper : styles.wrapper}>
      {/* Só renderiza a moldura (frame) se NÃO for a Home */}
      {!isHome && <View style={styles.frame} />}

      {/* Alterna o estilo da imagem baseado na prop isHome */}
      <Image source={source} style={isHome ? styles.homeImage : styles.image} />
    </View>

  );
}

const criarStyles = (colors: Colors) =>
  StyleSheet.create({
    wrapper: { alignSelf: 'center', width: '86%', aspectRatio: 1, marginBottom: 24 },
    frame: {
      position: 'absolute',
      top: -8,
      right: -8,
      left: 8,
      bottom: 8,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 20,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 20
    },
    homeWrapper: {
      alignSelf: 'center',
      marginBottom: 24,
    },
    homeImage: {
      width: 280,
      height: 140,
      resizeMode: 'contain', // Garante que o logo não fique distorcido
    },
  });