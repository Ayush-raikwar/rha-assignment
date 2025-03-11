import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/postsSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const PostDetailsScreen = () => {
    const dispatch = useDispatch()
    const routes = useRoute()
    const navigation = useNavigation()
    const { selectedPost } = useSelector(state => state.posts)
    const handleSavePost = () => {
        dispatch(addPost(selectedPost));
    };
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() =>navigation.goBack()}>
                <Ionicons name="arrow-back" color={"#000"} size={24} />
            </TouchableOpacity>
            <ImageBackground
                source={{ uri: 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg' }}
                borderRadius={12}
                style={styles.bgImg}>
                <TouchableOpacity style={styles.saveIcon}
                    onPress={() => handleSavePost()}>
                    <Feather name='bookmark' color={'#fff'} size={20} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.rowCenter}>
                <View style={styles.tagContainer}>
                    <Text style={{ fontSize: 14, textTransform: 'capitalize' }}>{routes.params?.tag ? routes.params?.tag : 'Crime'}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTxt}>{selectedPost?.createDate ? selectedPost?.createDate : '15 Jan, 2025'}</Text>
                    <Text style={styles.statsTxt}>•</Text>
                    <Text style={styles.statsTxt}>{selectedPost?.viewCount ? selectedPost?.viewCount : '420'} views</Text>
                </View>
            </View>
            <Text style={styles.title}>{selectedPost?.title ?? 'Test Title'}</Text>

            <View style={styles.rowCenter}>
                <View style={styles.rowCenter}>
                    <Image
                        source={{ uri: selectedPost?.imgUrl ?? 'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg' }}
                        style={styles.authorImg}
                    />
                    <Text style={styles.authorName}>By: <Text style={{ textDecorationLine: 'underline' }}>{selectedPost?.authorName ?? 'Ayush'}</Text></Text>
                </View>
                <TouchableOpacity style={styles.shareIcon}>
                    <FontAwesome name='share-square-o' color={'#666'} size={14} />
                </TouchableOpacity>
            </View>

            <Text style={styles.bodyTxt}>{selectedPost?.body ?? 'Lorem ipsum'}</Text>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bodyTxt: {
        fontSize: 16
    },
    shareIcon: {
        backgroundColor: 'rgba(0,0,0,.07)', padding: 4,
        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
    },
    authorName: {
        fontSize: 12,
        color: '#000'
    },
    authorImg: {
        width: 34, height: 34, borderRadius: 8, marginRight: 8
    },
    title: {
        fontSize: 22, fontWeight: '700', color: '#333'
    },
    bgImg: {
        width: '100%',
        height: 220,
        marginTop:12
    },
    container: {
        backgroundColor: '#fff', padding: 12
    },
    saveIcon: {
        padding: 4,
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 10,
        marginTop: 10
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', marginVertical: 12
    },
    tagContainer: {
        padding: 4,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(0,0,0,.07)',
        borderRadius: 6
    },
    statsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 6 },
    statsTxt: { fontSize: 12, color: 'rgba(0,0,0,.35)' },

})