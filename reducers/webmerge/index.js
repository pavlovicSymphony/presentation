/**
 * Webmerge reducer
 * It uses Map from immutable, to make sure that state can not be cahnged.
 */
import { Map } from 'immutable';
import { ActionTypes } from './actions';

const initialState = Map({
  isPublished: false,
  isPublishing: false,
  needsPublishing: true,
});

export default (state = initialState, action = {}) => {
  const { payload, type, error = null } = action;

  switch (type) {
      case ActionTypes.RESET_PUBLISHING:
        return state.merge(Map({
          isPublished: false,
          isPublishing: false,
          needsPublishing: true,
        }));

      case ActionTypes.NEEDS_PUBLISHING:
        return state.merge(Map({
          needsPublishing: false,
          isPublished: false,
          isPublishing: false,
        }));

      case ActionTypes.RESUME_PUBLISH:
        return state.merge(Map({
          needsPublishing: false,
          isPublished: false,
          isPublishing: true,
        }));

      case ActionTypes.RESUME_PUBLISHED:
        return state.merge(Map({
          needsPublishing: true,
          isPublished: true,
          isPublishing: false,
          error,
        }));

      case ActionTypes.HAS_RESUME_PUBLISHED:
        return state.merge(Map({
          needsPublishing: payload,
          error,
        }));

      default:
        return state;
  }
};
