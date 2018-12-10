import React from 'react';
import {
    FlatList
} from 'react-native';
import {ArtworkListItem} from '../components/ArtworkListItem';
import {connect} from 'react-redux';
import {listArtworks} from '../../data/reducer';
import {resetArtworks} from '../../data/reducer';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Artworks'
    };

    componentDidMount() {
        this.refresh();
    }

    render() {
        const artworks = this.props.artworks;
        return (<FlatList
            refreshing={this.props.loading}
            onRefresh={() => this.refresh()}
            onEndReached={() => this.loadNextArtworks()}
            onEndReachedEndThresold={0.8}
            keyExtractor={item => item.objectNumber}
            data={artworks}
            renderItem={({item}) => <ArtworkListItem {...this.props} artwork={item}></ArtworkListItem>}
        />);
    }

    refresh() {
        this.props.resetArtworks();
        this.props.listArtworks(1);
    }

    loadNextArtworks() {
        if (!this.props.loading) {
            const nextPage = this.props.requestedPage + 1;
            this.props.listArtworks(nextPage);
        }
    }
};

const mapStateToProps = state => {
    let artworks = state.artworks || [];
    return {
        artworks: artworks,
        requestedPage: state.requestedPage,
        loading: state.loading,
        error: state.error
    };
};

const mapDispatchToProps = {
    listArtworks,
    resetArtworks
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
