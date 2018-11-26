import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default class AboutScreen extends React.Component {
    static navigationOptions = {
        title: 'About Rijkshowroom',
    };

    render() {
        return (
            <View>
                <Text style={styles.text}>
                    Rijkshowroom is a school project app where you can checkout the best artworks from the Rijksmuseum.
                </Text>
                <Text style={[styles.text, styles.descriptionText]}>
                    We used React Native to make our app, which means we have a single code-base for multiple
                    target-platforms!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 10,
        backgroundColor: 'white',
    },
    descriptionText: {
        height: '100%'
    },
});
