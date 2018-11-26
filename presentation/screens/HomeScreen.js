import React from 'react';
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {ArtworkListItem} from '../components/ArtworkListItem';
import {connect} from 'react-redux';
import {listArtworks} from '../../data/reducer';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Artworks'
    };

    componentDidMount() {
        this.props.listArtworks(1);
    }

    render() {
        const artworks = this.props.artworks;
        return (<FlatList
            data={artworks}
            renderItem={({item}) => <ArtworkListItem artwork={item}></ArtworkListItem>}
        />);
    }
}

const styles = StyleSheet.create();

const mapStateToProps = state => {
    let artworks = state.artworks || [];
    artworks = artworks.map(artwork => ({key: artwork.id, ...artwork}));
    return {
        artworks: artworks
    };
};

const mapDispatchToProps = {
    listArtworks
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
