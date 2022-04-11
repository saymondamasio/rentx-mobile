import React, { useCallback, useState } from 'react'
import { FlatList, ViewToken } from 'react-native'
import {
  CarImage,
  CarImageWrapper,
  Container,
  ImageIndex,
  ImageIndexes,
} from './styles'

interface Props {
  imagesUrl: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0)

  const indexChanged = useCallback((info: ChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!)
  }, [])

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((image, index) => (
          <ImageIndex key={image} active={imageIndex === index} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged}
      />
    </Container>
  )
}
