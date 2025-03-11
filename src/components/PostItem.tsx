import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";
import Feather from 'react-native-vector-icons/Feather';

export const PostItem = ({category, title, bgImage, authorImg, author, createDate, viewCount, item}) => {
    const dispatch = useDispatch()
     const handleSavePost = (item) => {
        dispatch(addPost(item));
      };
        return (
          <View style={styles.itemContainer}>
            <ImageBackground
              source={{ uri: bgImage}}
              style={styles.bgImg}
              borderRadius={20}>
              <Text style={styles.category}>{category}</Text>
              <TouchableOpacity style={styles.saveIcon} 
                onPress={()=>handleSavePost(item)}>
                <Feather name='bookmark' color={'#fff'} size={20} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.itemTitle}>{title}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.rowCenter}>
                <Image
                  source={{ uri: authorImg }}
                  style={styles.authorImg}
                />
                <Text style={styles.authorName}>By: {author}</Text>
              </View>
              <View style={{}}>
              <View style={[styles.rowCenter, { gap: 6 }]}>
                <Text style={styles.date}>{createDate}</Text>
                <Text style={styles.date}>•</Text>
                <Text style={styles.date}>{viewCount} views</Text>
              </View>
              </View>
            </View>
          </View>
        )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 12,
      },
      bgImg: {
        width: 270,
        // width: '100%',
        height: 150,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 12
      },
      category: {
        padding: 6,
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 6,
        fontSize: 12,
        color: '#fff',
        textTransform:'capitalize'
      },
      itemTitle: {
        fontSize: 18, color: '#000', fontWeight: '700',
        width: '70%'
      },
      statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', marginVertical: 12
      },
      authorImg: {
        width: 40, height: 40, borderRadius: 12, marginRight: 6
      },
      saveIcon: {
        padding: 4,
        backgroundColor: 'rgba(255,255,255,.5)',
        borderRadius: 6
      },
      rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      date: {
        fontSize: 12,
        fontWeight: '300', color: '#000'
      },
      authorName: {
        fontSize: 14,
        color: '#000'
      },
})