import { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from "react-redux";
import {addPost, setPosts} from '../redux/postsSlice'
import { PostItem } from "../components/PostItem";
import _ from "lodash";


export const HomeScreen = () => {

  // const API_URL = "https://jsonplaceholder.typicode.com/posts"; 
  const API_URL = "https://dummyjson.com/docs/posts";

  const dispatch = useDispatch()
  const [localposts, setLocalPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const reduxPosts = useSelector((state) => state.posts);


  const ITEM_HEIGHT = 250

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(()=>{
    // console.log(
    //   localposts.filter(item=>item.title?.includes(searchQuery))
    // );
    setLocalPosts(localposts.filter(item=>item.title?.includes(searchQuery)||item.body?.includes(searchQuery)))
  },[searchQuery])

  const fetchData = async () => {
    // if (loading) return;
    // setLoading(true)
    // try {
    //   const response = await fetch(`${API_URL}`)
    //   const newPosts = await response.json()
    //   console.log(newPosts,'----test-');
      
    //   setPosts([...posts, ...newPosts])
    //   // setPage(page + 1)

    // } catch (e) {
    //   console.log(e, '----error')
    // }
    // setLoading(false)

    if(loading) return;
    setLoading(true)

    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(val=>{
      setLocalPosts(val.posts)
    });

  }

  // const fetchData = useCallback(async () => {
  //     if (loading) return;
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`${API_URL}?_limit=10&_page=${page}`);
  //       const newPosts = await response.json();
  //       setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Prevent stale state issues
  //       setPage((prevPage) => prevPage + 1);
  //     } catch (e) {
  //       console.log(e, "----error");
  //     }
  //     setLoading(false);
  //   }, [loading, page]);

  const memoizedPosts = useMemo(() => localposts, [localposts]);
  const handleSavePost = (item) => {
    dispatch(addPost(item));
  };

  // const renderItem = useMemo(
  //   () =>
  //     ({ item }) => (
  //       <View style={styles.item}>
  //         <Text style={styles.title}>{item.title}</Text>
  //         <Text
  //           style={{
  //             fontSize: 20,
  //             color: "grey",
  //             borderBottomWidth: 1,
  //             paddingBottom: 12,
  //           }}
  //         >
  //           {item.body}
  //         </Text>
  //       </View>
  //     ),
  //   []
  // );

const renderItem = ({item}) => {
  
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
  const debouncedSearch = useCallback(_.debounce(fetchData, 500), []);

  // Handle input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

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
      <FlatList
        data={localposts}
        // data={memoizedPosts}
        keyExtractor={(item) => item.id.toString()}

        // initialNumToRender={10}
        // maxToRenderPerBatch={10}
        // getItemLayout={(data, index) => ({
        //   length: ITEM_HEIGHT,
        //   offset: ITEM_HEIGHT * index,
        //   index,
        // })}
        // onEndReached={fetchData}
        // onEndReachedThreshold={0.5}
        renderItem={renderItem}
        horizontal
        
      />
      {/* <PostItem
        author={'ayush'}
        authorImg={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
        bgImage={'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_1280.jpg'}
        category={'Science'}
        createDate={'4 jan 2023'}
        title={'Test'}
        viewCount={'424'}
      /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    fontWeight: '300', color: '#000'
  },
  authorName: {
    fontSize: 14,
    color: '#000'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
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
  itemTitle: {
    fontSize: 18, color: '#000', fontWeight: '700',
    width: '70%'
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
  itemContainer: {
    marginHorizontal: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: Dimensions.get('screen').width,
  },
  container: {

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