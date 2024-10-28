import { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite" // @mst remove-current-line
import { AccessibilityProps, FlatList, ImageSourcePropType, Image, ImageStyle, Platform, StyleSheet, TextStyle, View, ViewStyle, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, ButtonAccessoryProps, Card, EmptyState, Icon, Screen, Text } from "@/components"
// import { useNavigation } from "@react-navigation/native"
import { User, useStores, UserModel } from "@/models" // @mst remove-current-line
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { isRTL, translate } from "@/i18n"
import { ContentStyle } from "@shopify/flash-list"
import { delay } from "@/utils/delay"

interface UserListScreenProps extends AppStackScreenProps<"UserList"> { }
const ICON_SIZE = 14
const PAGE_SIZE = 12
// @mst replace-next-line export const UserListScreen: FC<UserListScreenProps> = () => {
export const UserListScreen: FC<UserListScreenProps> = observer(function UserListScreen({ navigation }) {

  const { userStore } = useStores()
  const { themed } = useAppTheme()
  // Pull in navigation via hook
  // const navigation = useNavigation()


  const [currentPage, setCurrentPage] = useState(0)
  const [paginatedData, setPaginatedData] = useState<typeof userStore.usersList>()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const maxPage = Math.ceil(userStore.usersList.length / PAGE_SIZE)

  const loadNextPage = () => {
    setIsLoading(true)
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

      await userStore.fetchUsers()
      setRefreshing(false)

    })()
  }, [userStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([userStore.fetchUsers(), delay(750)])
    setRefreshing(false)
  }

  const readPaginatedData = () => {
    const start = currentPage * PAGE_SIZE
    const end = start + PAGE_SIZE
    setPaginatedData(userStore.usersList.slice(start, end))
  }

  useEffect(() => {
    readPaginatedData()
  }, [currentPage, userStore.usersList])


  const UserCard = observer(function UserCard({
    user,
  }: {
    user: User
  }) {
    const {
      theme: { colors },
      themed,
    } = useAppTheme()

    const imageUri = useMemo<ImageSourcePropType>(() => {
      return { uri: user.image }
    }, [])

    const handlePressCard = () => {
      // openLinkInBrowser(episode.enclosure.link)
      navigation.navigate("Post", { userId: user.id })
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
              size="lg"
              accessibilityLabel={user.firstName}
            >
              {user.firstName}
            </Text>
            <Text
              style={themed($metadataText)}
              size="lg"
              accessibilityLabel={user.firstName}
            >
              {user.lastName}
            </Text>
          </View>
        }

        content={`${user.company.title} - ${user.company.name}`}
        FooterComponent={<View style={[ themed($metadata)]}>
          <Text
            style={themed($metadataText)}
            size="xs"
            accessibilityLabel={user.firstName}
          >
            {user.age +" years old"}
          </Text>
          <Text
            style={themed($metadataText)}
            size="xs"
            accessibilityLabel={user.firstName}
          >
            {user.email}
            
          </Text>
          <Text
            style={themed($metadataText)}
            size="xs"
            accessibilityLabel={user.firstName}
          >
            {user.phone}
            
          </Text>
        </View>}
        RightComponent={<Image source={imageUri} style={themed($itemThumbnail)} />}
      />
    )
  })


  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} >
      <Text style={$page} text={"Page: " + (currentPage + 1).toString()+" of "+maxPage} />
      <FlatList
        data={paginatedData}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        onEndReached={loadNextPage}
        onStartReached={loadPreviousPage}
        renderItem={({ item }) => (
          <UserCard
            user={item}

          />
        )}
        ListEmptyComponent={
          refreshing ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={themed($emptyState)}

              button={"Retry"}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }

        ListHeaderComponent={
          <View style={themed($heading)}>
            <Text preset="heading" text="UserList" />

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
  marginEnd: spacing.xs,
})

const $emptyState: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
const $heading: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
// #endregion