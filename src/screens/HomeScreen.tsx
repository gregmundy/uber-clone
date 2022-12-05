import { SafeAreaView, Text, View, Image, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from '@env';
import tw from 'twrnc';
import NavOptions from "../components/NavOptions";
import { useDispatch } from "react-redux";
import { setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={{ uri: "https://links.papareact.com/gzs" }} />
                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    query={{
                        key: GOOGLE_MAPS_API_KEY,
                        language: "en",
                    }}
                    enablePoweredByContainer={false}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details?.geometry.location,
                            description: data.description
                        }));
                    }}
                    fetchDetails={true}
                    minLength={2}
                    styles={{
                        container: {
                            flex: 0
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                />
            </View>
            <View>
                <NavOptions />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "blue"
    }
})

export default HomeScreen;