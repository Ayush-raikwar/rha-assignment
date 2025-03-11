import { FlatList, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux";
import { PostItem } from "../components/PostItem";

export const SavedPosts = () => {

    const {savedPosts} = useSelector((state) => state.posts);
    const renderItems =({item}) => {
        return(
            <PostItem
                author={'Ayush'}
                authorImg={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
                bgImage={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
                category={item?.tags[0]}
                createDate={'Jan 6, 2025'}
                title={item?.title}
                viewCount={item?.reactions?.views}
                item={item}
            />
        )
    }

    return(
        <View style={styles.container}>
          <Text style={styles.heading}>Saved Posts</Text>  
            <FlatList
                data={savedPosts}
                renderItem={renderItems}
                keyExtractor={(item)=>item.id.toString()}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    heading: {
        fontSize: 28, fontWeight: '700', marginHorizontal: 12,marginBottom:20
    },

})