import React, {Component} from "react";
import {FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {SafeAreaView} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import {getComments, saveComment} from "../actions";
import distanceInWords from 'date-fns/distance_in_words'

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            comments: [],
            comment: ''
        };
    }

    static getDerivedStateFromProps(props) {
        return {comments: [{type: 'header'}, ...props.comments]};
    }

    componentDidMount() {
        let movie = this.props.navigation.getParam('movie', null);
        this.setState({
            movie: movie,
            comments: [{type: 'header'}]
        });

        this.props.getComments({rank: movie.rank});
    }

    sendComment() {
        let comment = this.state.comment;
        let movie = this.state.movie;
        let utc_time = new Date().toUTCString();
        let timestamp = new Date().getTime();

        if (comment.length > 0 && movie.rank)
            this.props.saveComment({rank: movie.rank, comment: comment, timestamp: timestamp, utc_time: utc_time});

        this.setState({comment: ''});
        this.commentsList.scrollToEnd();
    }

    renderMovieHeader() {
        let movie = this.state.movie;
        if (!movie)
            return null;

        return (
            <View style={styles.movieHeader}>
                <Text style={styles.movieTitle}>
                    {movie.title} ({movie.year})
                </Text>
                {this.state.comments.length === 1
                    ? <View style={styles.emptyView}>
                        <Icon name="add-circle-outline" size={60} color={'#CCC'}/>
                        <Text style={styles.emptyText}>
                            There are no comments for this movie yet. Why don't you add one now!
                        </Text>
                    </View>
                    : null}
            </View>
        );
    }

    _renderItem(item) {
        if (item.type === 'header')
            return this.renderMovieHeader();
        else
            return (
                <View style={styles.card}>
                    <Text style={styles.commentTimeText}>{distanceInWords(item.timestamp, new Date())} ago</Text>
                    <Text style={styles.commentText}>{item.comment}</Text>
                </View>
            );
    }

    _renderHeader() {
        return (
            <View>
                <Text style={styles.pageTitle}>Comments</Text>
            </View>
        );
    }

    _renderFooter() {
        return (
            <View style={{height: 100}}/>
        );
    }

    _keyExtractor = (item, index) => `movie_${item.rank}_${index}`;

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
                <FlatList
                    ref={elm => this.commentsList = elm}
                    style={{flex: 1}}
                    ListHeaderComponent={this._renderHeader()}
                    ListFooterComponent={this._renderFooter()}
                    stickyHeaderIndices={[1]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => this._renderItem(item)}
                    data={this.state.comments}
                    initialNumToRender={10}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}/>
                <View style={styles.commentInputView}>
                    <View style={{flex: 1}}>
                        <TextInput
                            value={this.state.comment}
                            onChangeText={(text) => this.setState({comment: text})}
                            style={styles.commentInput}
                            maxLength={150}
                            placeholder={'Write comment'}
                            placeholderTextColor={'#CCCCCC'}
                            selectTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            multiline={true}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.sendComment()}>
                            <Icon name="send" size={20} color={'#000'} style={{padding: 10}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getComments,
        saveComment
    }, dispatch);
};

const mapStateToProps = state => ({
    comments: state.comments.comments.comments
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    card: {
        padding: 10,
        marginVertical: 5,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 10
    },
    pageTitle: {
        fontFamily: 'Product Sans Regular',
        padding: 10,
        fontSize: 40
    },
    movieHeader: {
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF'
    },
    movieTitle: {
        fontFamily: 'Product Sans Regular',
        fontSize: 22,
        marginBottom: 20,
        marginTop: 10
    },
    movieDetailText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 12,
        lineHeight: 18
    },
    emptyView: {
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 14,
        color: '#CCC',
        textAlign: 'center'
    },
    commentInputView: {
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
        margin: 5
    },
    commentInput: {
        padding: 5,
        paddingHorizontal: 10,
        fontFamily: 'Product Sans Regular',
        fontSize: 14,
    },
    commentText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 14
    },
    commentTimeText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 10,
        textAlign: 'right'
    }
});
