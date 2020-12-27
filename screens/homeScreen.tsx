import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/actions/action';
import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


export const HomeScreen = (props: any) => {
    const dispatch = useDispatch();
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false);
    const posts: any = useSelector((state: any) => state.app.posts)

    useEffect(() => {
        getNewPosts(page)
    }, [dispatch, page]);

    useEffect(() => {
        const inteval = setInterval(async () => {
            setpage(page + 1)
        }, 10000)
        return () => {
            clearInterval(inteval);
        }
    }, [page])


    const getNewPosts = (pageNum: number) => {
        setloading(true)
        dispatch(getPosts(pageNum))
        setloading(false)
    }

    const navigateToDetails = (selectedPost: any) => {
        props.navigation.navigate('Details', {
            selectedPost: selectedPost
        });
    }
    return (
        <View testID="home-wrapper" style={styles.screen}>
            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.key}
                renderItem={itemData => (
                    <TouchableOpacity style={styles.card} onPress={() => {
                        navigateToDetails(itemData.item)
                    }}>
                        <Text style={styles.text}>
                            Title: {itemData.item.title}
                        </Text>
                        <Text style={styles.text}>
                            URL: {itemData.item.url}
                        </Text>
                        <Text style={styles.text}>
                            Created At:  {new Date(itemData.item.created_at).toDateString()}
                        </Text>
                        <Text style={styles.text}>
                            Author: {itemData.item.author}
                        </Text>
                    </TouchableOpacity>
                )}
                onEndReached={() => {
                    setpage(page + 1)
                }}
                onEndReachedThreshold={.5}
                numColumns={1}
            />
            {loading && <ActivityIndicator size="large" color="blue" />}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    card: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f25278",
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 5
    }
})