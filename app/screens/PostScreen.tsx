import { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite" // @mst remove-current-line
import { AccessibilityProps, FlatList, ImageSourcePropType, Image, ImageStyle, Platform, StyleSheet, TextStyle, View, ViewStyle, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, ButtonAccessoryProps, Card, EmptyState, Icon, Screen, Text } from "@/components"
// import { useNavigation } from "@react-navigation/native"
import { User, useStores, UserModel, Posts } from "@/models" // @mst remove-current-line
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { isRTL, translate } from "@/i18n"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "@/utils/delay"

interface PostScreenProps extends AppStackScreenProps<"Post"> { }
const ICON_SIZE = 14
const PAGE_SIZE = 8

export const PostScreen: FC<PostScreenProps> = observer(function PostScreen({navigation, route}) {

  const { postsStore } = useStores()
  const { themed } = useAppTheme()

  const [currentPage, setCurrentPage] = useState(0)
  const [paginatedData, setPaginatedData] = useState<typeof postsStore.postsList>()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadNextPage = () => {
    setIsLoading(true)
    const maxPage = Math.ceil(postsStore.postsList.length / PAGE_SIZE)
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1)
    }
    setIsLoading(false)

  }
  const loadPreviousPage = () => {
    setIsLoading(true)

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
    setIsLoading(false)

  }

  
  useEffect(() => {
    ; (async function load() {
      setRefreshing(true)

      await postsStore.fetchUserPosts(route.params.userId)
      setRefreshing(false)

    })()
  }, [postsStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([postsStore.fetchUserPosts(route.params.userId), delay(750)])
    setRefreshing(false)
  }

  const readPaginatedData = () => {
    const start = currentPage * PAGE_SIZE
    const end = start + PAGE_SIZE
    setPaginatedData(postsStore.postsList.slice(start, end))
  }

  useEffect(() => {
    readPaginatedData()
  }, [currentPage, postsStore.postsList])

console.log(postsStore.postsList, "pos")
  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} >
      <Text style={$page} text={"Page: " + (currentPage + 1).toString()} />
      <FlatList
        data={paginatedData}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        onEndReached={loadNextPage}
        onStartReached={loadPreviousPage}
        renderItem={({ item }) => (
          <UserCard
            post={item}

          />
        )}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={themed($emptyState)}

              button={undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }

        ListHeaderComponent={
          <View style={themed($heading)}>
            <Icon icon="back" style={{marginRight:15, marginLeft:5}} onPress={()=>navigation.goBack()}/>
            <Text preset="heading" text="UserPosts" />
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : null

        }
      />
    </Screen>
  )
})

const UserCard = observer(function UserCard({
  post,
}: {
  post: Posts
}) {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  const handlePressCard = () => {
    // openLinkInBrowser(episode.enclosure.link)
  }

  return (
    <Card
      style={themed($item)}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      HeadingComponent={
        <View style={[$styles.row, themed($metadata)]}>
          <Text
            style={themed($metadataText)}
            size="xl"
            accessibilityLabel={post.title}
          >
            {post.title}
          </Text>
          
        </View>
      }
      content={`${post.body} - ${post.body}`}
      FooterComponent={
        <View style={[$styles.row, themed($metadata)]}>
          <Icon icon=""/>
        </View>
      }
    />
  )
})


const $root: ViewStyle = {
  flex: 1,
}

const $page: TextStyle = {
  position: "absolute",
  right: 15,
  top: 15,
  zIndex: 5
}
// #region Styles

const $item: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
  backgroundColor: colors.palette.neutral100,
})

const $itemThumbnail: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
})

const $metadata: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.xs,
})

const $metadataText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  flexDirection:"row",
  alignItems:"center"
})
// #endregion