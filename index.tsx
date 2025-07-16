import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const imageData = [
  { main: 'https://picsum.photos/id/1011/200', alt: 'https://picsum.photos/id/1012/200' },
  { main: 'https://picsum.photos/id/1013/200', alt: 'https://picsum.photos/id/1014/200' },
  { main: 'https://picsum.photos/id/1015/200', alt: 'https://picsum.photos/id/1016/200' },
  { main: 'https://picsum.photos/id/1018/200', alt: 'https://picsum.photos/id/1019/200' },
  { main: 'https://picsum.photos/id/1020/200', alt: 'https://picsum.photos/id/1021/200' },
  { main: 'https://picsum.photos/id/1022/200', alt: 'https://picsum.photos/id/1023/200' },
  { main: 'https://picsum.photos/id/1025/200', alt: 'https://picsum.photos/id/1026/200' },
  { main: 'https://picsum.photos/id/1031/200', alt: 'https://picsum.photos/id/1032/200' }, // ✅ Gambar ke-8 diganti
  { main: 'https://picsum.photos/id/1029/200', alt: 'https://picsum.photos/id/1030/200' },
];

export default function Index() {
  const [images, setImages] = useState(
    imageData.map((img, i) => ({
      id: i,
      currentSrc: img.main,
      scale: 1,
      flipped: false,
    }))
  );

  const handlePress = (id: number) => {
    setImages(prev =>
      prev.map(img => {
        if (img.id === id) {
          const newScale = Math.min(img.scale * 1.2, 2);
          const flipped = !img.flipped;
          const newSrc = flipped ? imageData[img.id].alt : imageData[img.id].main;
          return { ...img, currentSrc: newSrc, scale: newScale, flipped };
        }
        return img;
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {images.map(img => (
          <TouchableOpacity key={img.id} onPress={() => handlePress(img.id)} style={styles.cell}>
            <Image
              source={{ uri: img.currentSrc }}
              style={[styles.image, { transform: [{ scale: img.scale }] }]}
              onError={() => console.warn(`Gagal muat gambar ID: ${img.id}`)}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 330,
    justifyContent: 'center',
  },
  cell: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
