import { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPosts } from '../redux/postsSlice'
import { PostItem } from "../components/PostItem";
import _ from "lodash";
import { TagsList } from "../components/TagsList";
import { TaggedItem } from "../components/TaggedItem";


export const HomeScreen = () => {

  // const API_URL = "https://jsonplaceholder.typicode.com/posts"; 
  const API_URL = "https://dummyjson.com/docs/posts";

  const [localposts, setLocalPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { selectedTag } = useSelector((state) => state.tags);
  const [taggedPosts, setTaggedPosts] = useState([])



  const ITEM_HEIGHT = 250

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // setLocalPosts(localposts.filter(item => (item.title?.includes(searchQuery) || item.body?.includes(searchQuery))))
    if (searchQuery.trim() === "") {
      setLocalPosts(memoizedPosts);
    } else {
      setLocalPosts(localposts.filter(item =>
        item.title?.includes(searchQuery) || item.body?.includes(searchQuery)
      ));
    }
  }, [searchQuery])

  useEffect(() => {
    setTaggedPosts(memoizedPosts.filter(item => item.tags?.includes(selectedTag)))
  }, [selectedTag])

  const fetchData = async () => {
    if (loading) return;
    setLoading(true)

    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(val => {
        setLocalPosts(val.posts)
        setTaggedPosts(val.posts)
      });

  }

  const memoizedPosts = useMemo(() => localposts, [localposts]);


  const renderItem = ({ item }) => {

    return (
      <PostItem
        author={'Ayush'}
        authorImg={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
        bgImage={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
        category={item?.tags[0]}
        createDate={'Jan 6, 2025'}
        title={item?.title}
        viewCount={item?.views}
        item={item}
      />
    )
  }
  const debouncedSearch = useCallback(_.debounce(fetchData, 500), []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };
  const renderTaggedPosts = ({ item }) => {

    return (
      <TaggedItem
        createDate={'5 March 2025'}
        tag={selectedTag??item?.tags[0]}
        title={item.title}
        viewCount={item.views}
        postId={item.id}
      />
    )
  }
  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <AntDesign name='search1' color={'black'} size={20} />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.search}
            placeholder="Search ..."
          />
          <TouchableOpacity>
            <AntDesign name='filter' color={'black'} size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <AntDesign name='bells' color={'black'} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Recommended</Text>
      <View>
        <FlatList
          data={localposts}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text >No Records Found!!</Text>}
          renderItem={renderItem}
          horizontal
          style={{ marginVertical: 12, }}
        />
      </View>
      <View style={{ paddingHorizontal: 12, paddingTop:12 }}>
        <TagsList />
      </View>

      <FlatList
        data={taggedPosts}
        renderItem={renderTaggedPosts}
        keyExtractor={(item) => item.id.toString()}
        style={{width:'100%', height:300}}
        contentContainerStyle={{gap:12, padding:12}}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  postImg: {
    width: 110, height: 100,
    borderRadius: 18
  },
  taggedPostContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: Dimensions.get('screen').width,
  },
  container: {
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 28, fontWeight: '700', marginHorizontal: 12
  },
  search: {
    color: '#000',
    width: '80%'
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.15)',
    padding: 12, paddingVertical: 6, borderRadius: 42
  }
})