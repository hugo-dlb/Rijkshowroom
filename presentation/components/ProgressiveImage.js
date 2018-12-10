import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export class ProgressiveImage extends React.Component {
    thumbnailAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleThumbnailLoad = () => {
        Animated.timing(this.thumbnailAnimated, {
            toValue: 1,
        }).start();
    };

    onImageLoad = () => {
        Animated.timing(this.imageAnimated, {
            toValue: 1,
        }).start();
    };

    render() {
        const {
            thumbnailSource,
            source,
            ...props
        } = this.props;

        return (
            <View style={styles.imageContainer}>
                <Animated.Image
                    {...props}
                    source={thumbnailSource}
                    style={[styles.image, {opacity: this.thumbnailAnimated}]}
                    onLoad={this.handleThumbnailLoad}
                    blurRadius={5}
                />
                <Animated.Image
                    {...props}
                    source={source}
                    style={[styles.image, styles.imageOverlay, {opacity: this.imageAnimated}]}
                    onLoad={this.onImageLoad}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    imageContainer: {
        width: '100%',
        height: 450
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
});
