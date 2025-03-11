import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../redux/postsSlice";

export const TaggedItem = ({
    postId,
    imgUrl,
    title,
    tag,
    createDate,
    viewCount,
}) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handlePostSelect = () => {
        fetch(`https://dummyjson.com/posts/${postId}`)
            .then(res => res.json())
            .then(val => {
                dispatch(setSelectedPost(val))
                navigation.navigate("PostDetails", { tag: tag })
            });
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePostSelect()}>
            <Image style={styles.image} source={{ uri: imgUrl ?? 'https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg?ct=jpeg' }} />

            <View style={styles.rightContainer}>
                <View style={styles.topRow}>
                    <View style={styles.tagContainer}>
                        <Text style={{ fontSize: 10, textTransform: 'capitalize' }}>{tag}</Text>
                    </View>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statsTxt}>{createDate}</Text>
                        <Text style={styles.statsTxt}>•</Text>
                        <Text style={styles.statsTxt}>{viewCount} views</Text>
                    </View>
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 110, height: 100,
        borderRadius: 18
    },
    rightContainer: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18
    },
    topRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tagContainer: {
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(0,0,0,.07)',
        borderRadius: 6
    },
    statsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4 },
    statsTxt: { fontSize: 10, color: 'rgba(0,0,0,.35)' },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
        textAlign: 'left',
        width: '100%'
    }
})