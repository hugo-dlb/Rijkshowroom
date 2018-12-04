export const RESET_ARTWORK_DETAILS = 'RESET_ARTWORKS';
export const GET_ARTWORK_DETAILS = 'GET_ARTWORK_DETAILS';
export const GET_ARTWORK_DETAILS_SUCCESS = 'GET_ARTWORK_DETAILS_SUCCESS';
export const GET_ARTWORK_DETAILS_FAIL = 'GET_ARTWORK_DETAILS_FAIL';

export const RESET_ARTWORKS = 'RESET_ARTWORKS';
export const GET_ARTWORKS = 'GET_ARTWORKS';
export const GET_ARTWORKS_SUCCESS = 'GET_ARTWORKS_SUCCESS';
export const GET_ARTWORKS_FAIL = 'GET_ARTWORKS_FAIL';
export const ARTWORKS_PER_PAGE = 10;

const DEFAULT_STATE = {
    artworks: [],
    requestedPage: 0,
    loading: true,
    detailsLoading: true,
    error: null
};

export default function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case RESET_ARTWORKS:
            return { ...state, artworks: []};
        case GET_ARTWORKS:
            return { ...state, loading: true, requestedPage: action.payload.requestedPage };
        case RESET_ARTWORK_DETAILS:
            return { ...state, artworkDetails: null};
        case GET_ARTWORK_DETAILS:
            return { ...state, detailsLoading: true };
        case GET_ARTWORK_DETAILS_SUCCESS:
            return { ...state, detailsLoading: false, artworkDetails: action.payload.data };
        case GET_ARTWORK_DETAILS_FAIL:
            return {
                ...state,
                detailsLoading: false,
                artworkDetails: null,
                error: 'Error while fetching artwork details'
            };
        case GET_ARTWORKS_SUCCESS:
            const artworks = state.artworks;
            artworks.push(...action.payload.data.artObjects);
            return { ...state, loading: false, artworks: artworks };
        case GET_ARTWORKS_FAIL:
            return {
                ...state,
                loading: false,
                artworks: [],
                requestedPage: 0,
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
                url: '/collection/?key=zjIRbhGs&format=json&p=' + page + '&ps=' + ARTWORKS_PER_PAGE
            },
            requestedPage: page
        }
    };
}

export function resetArtworks() {
    return {
        type: RESET_ARTWORKS
    };
}

export function getArtworkDetails(objectNumber) {
    return {
        type: GET_ARTWORK_DETAILS,
        payload: {
            request: {
                url: '/collection/' + objectNumber + '?key=zjIRbhGs&format=json'
            }
        }
    };
}

export function resetArtworkDetails() {
    return {
        type: RESET_ARTWORK_DETAILS
    };
}
