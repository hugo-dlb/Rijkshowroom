import React from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import {getArtworkDetails, resetArtworkDetails} from '../../data/reducer';
import connect from 'react-redux/es/connect/connect';
import {ProgressiveImage} from '../components/ProgressiveImage';

class ArtworkDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.item.title}`,
    });

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            const artwork = this.props.artworkDetails.artObject;
            let image = null;

            if (artwork.hasImage) {
                image = <ProgressiveImage
                            thumbnailSource={{uri: this.props.navigation.state.params.item.headerImage.url}}
                            source={{uri: artwork.webImage.url}}
                            style={styles.image}/>;
            }

            const documentation = [];
            artwork.documentation.forEach(item => documentation.push(<Text>{item}</Text>));

            return (
                <ScrollView>
                    {image}
                    <View style={styles.content}>
                        <Text style={styles.longTitle}>{artwork.longTitle}</Text>
                        <Text style={styles.subTitle}>{artwork.subTitle}</Text>
                        <Text style={styles.description}>{artwork.longTitle}</Text>
                        <Text style={styles.acquisition}>Acquisition: {artwork.acquisition.method.charAt(0).toUpperCase() + artwork.acquisition.method.slice(1)}</Text>
                        <Text style={styles.acquisitionCreditLine}>{artwork.acquisition.creditLine}</Text>
                    </View>
                </ScrollView>
                // {documentation}
            )
        }
    }

    componentDidMount() {
        const item = this.props.navigation.state.params.item;
        this.props.getArtworkDetails(item.objectNumber);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    content: {
        padding: 10,
        backgroundColor: 'white'
    },
    longTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    subTitle: {
        color: '#696969',
        paddingBottom: 10
    },
    description: {
        paddingBottom: 5
    },
    acquisition: {
    },
    acquisitionCreditLine: {
        color: '#696969',
        paddingBottom: 5
    },
    documentation: {
    }
});

const mapStateToProps = state => {
    let artworkDetails = state.artworkDetails;
    return {
        artworkDetails: artworkDetails,
        loading: state.detailsLoading,
        error: state.error
    };
};

const mapDispatchToProps = {
    getArtworkDetails,
    resetArtworkDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkDetailsScreen);
