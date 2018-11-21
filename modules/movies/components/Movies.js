import React, {Component} from "react";
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {SafeAreaView} from "react-navigation";
import {MOVIES} from "../constants";
import Icon from 'react-native-vector-icons/MaterialIcons';

class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    showComments(movie) {
        this.props.navigation.navigate('Comments', {movie: movie});
    }

    renderGenres(genres) {
        let renderedGenres = [];
        renderedGenres = renderedGenres.concat(
            genres.map((genre) => {
                return (
                    <View style={styles.genre} key={genre.toLowerCase()}>
                        <Text style={styles.genreText}>{genre}</Text>
                    </View>
                );
            })
        );
        return renderedGenres;
    }

    _renderItem(item) {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.showComments(item)}>
                            <Icon name="comment" size={22} color={'#000'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.movieDetailText}>Directed by {item.director}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.movieDetailText}>Year: {item.year}</Text>
                        <Text style={styles.movieDetailText}>Runtime: {item.runtime} mins</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.movieDetailText}>Rating: {item.rating}</Text>
                        <Text style={styles.movieDetailText}>Meta Score: {item.metascore}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    {this.renderGenres(item.genre)}
                </View>
            </View>
        );
    }

    _renderHeader() {
        return (
            <View>
                <Text style={styles.pageTitle}>Movies</Text>
            </View>
        );
    }

    _keyExtractor = (item, index) => `movie_${item.rank}_${index}`;

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
                <FlatList
                    style={{flex: 1}}
                    ListHeaderComponent={this._renderHeader()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => this._renderItem(item)}
                    data={MOVIES}
                    initialNumToRender={10}
                    keyExtractor={this._keyExtractor}
                    numColumns={1}/>
            </SafeAreaView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movies);

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
    movieTitle: {
        fontFamily: 'Product Sans Regular',
        fontSize: 20,
        marginBottom: 10
    },
    movieDetailText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 12,
        lineHeight: 18
    },
    genre: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: '#FFF',
        borderWidth: 1,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginRight: 5,
    },
    genreText: {
        fontFamily: 'Product Sans Regular',
        fontSize: 10
    }
});
