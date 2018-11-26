export const GET_ARTWORKS = 'GET_ARTWORKS';
export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';
export const GET_ARTWORKS_FAIL = 'GET_ARTWORKS_FAIL';

const DEFAULT_STATE = {
    artworks: [],
    loading: false,
    error: null
};

export default function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_ARTWORKS:
            return { ...state, loading: true };
        case GET_ARTWORKS_SUCCESS:
            return { ...state, loading: false, artworks: action.payload.data.artObjects };
        case GET_ARTWORKS_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching artworks'
            };
        default:
            return state;
    }
}

export function listArtworks(page = 1) {
    return {
        type: GET_ARTWORKS,
        payload: {
            request: {
                url: '/collection/?key=zjIRbhGs&format=json&p=' + page
            }
        }
    };
}
