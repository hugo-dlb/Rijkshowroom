import React from 'react';
import {Text, View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';

export class ArtworkListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let image = null;

        if (this.props.artwork.hasImage) {
            image = (<Image
                style={{
                    flex: 1,
                    resizeMode: 'cover',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}
                source={{ uri: this.props.artwork.headerImage.url }}>
            </Image>);
        }

        return (
            <TouchableWithoutFeedback onPress={this.handleItemPress.bind(this, this.props.artwork)}>
                <View style={styles.container}>
                    {image}
                    <View style={styles.descriptionContainer}>
                        <View style={styles.text}>
                            <Text style={styles.title}>{this.props.artwork.title}</Text>
                        </View>
                        <View style={styles.text}>
                            <Text style={styles.author}>{this.props.artwork.id}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    handleItemPress(item) {
        this.props.navigation.push('Details', {item: item});
    }
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        backgroundColor: 'white',
    },
    descriptionContainer: {
        padding: 10
    },
    text: {
        padding: 5,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        color: 'black',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    author: {
        color: '#696969',
    }
});
