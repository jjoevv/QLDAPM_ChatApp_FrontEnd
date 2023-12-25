import * as actionTypes from './../actions/actionTypes'
const appReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SAVE_TO_LOCAL_STORAGE:
            return {
                ...state,
                user: action.payload
            }
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
            };

        case actionTypes.REGISTER_REQUESTE:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.SEARCH_FRIEND:
            return {
                ...state,
                searchFriend: action.payload
            };

        case actionTypes.GET_CHAT_ROOMS:
            return {
                ...state,
                listChatrooms: action.payload
            }
        case actionTypes.GET_FRIENDS:
            return {
                ...state,
                listFriends: action.payload
            };
        case actionTypes.GET_REQUESTS:
            return {
                ...state,
                listRequests: action.payload
            };
        case actionTypes.GET_SENDS:
            return {
                ...state,
                listSends: action.payload
            };

        case actionTypes.JOIN_ROOM:
            return {
                ...state,
                room: action.payload
            }
        case actionTypes.GROUP_ROOM:
            return {
                ...state,
                group_room: action.payload
            }
            case actionTypes.SINGLE_ROOM:
                return {
                    ...state,
                    singleRoom: action.payload
                }
        case actionTypes.GET_MESSAGES:
            return {
                ...state,
                listMessages: action.payload
            }
        default:
            return state;
    }
};

export default appReducer