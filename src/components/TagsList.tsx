import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTag, setTags } from "../redux/tagsSlice";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

export const TagsList = () => {
    const dispatch = useDispatch();
    const {allTags} = useSelector((state) => state.tags);
    const [tag, setTag] = useState(null)

    useEffect(() => {
        fetch('https://dummyjson.com/posts/tag-list')
            .then(res => res.json())
            .then(val => dispatch(setTags(val))).catch(err => console.log(err));
    }, []);

    const handleSelect = (tag) => {
        setTag(tag)
        dispatch(setSelectedTag(tag))
    }
    const renderTags = ({ item, index }) => {
        let isSelected = item === tag
        return (
            <TouchableOpacity style={isSelected?styles.activeBtn:styles.tagBtn} onPress={()=>handleSelect(item)}>
                <Text style={isSelected?styles.activeTxt:styles.tagTxt}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={allTags}
            renderItem={renderTags}
            horizontal
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{gap:8}}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    tagTxt: {
        fontSize: 14, color: 'rgba(0,0,0,.6)', textTransform: 'capitalize',
    },
    tagBtn: {
        padding: 6, paddingHorizontal: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: .5,
    },
    activeBtn: {
        padding: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: .5
        , backgroundColor: 'rgba(0,0,0,.8)',
    }, activeTxt: {
        color: '#fff', textTransform: 'capitalize',
    }
})