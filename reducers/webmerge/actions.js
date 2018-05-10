import axios from 'axios';
import { prepareWebmergeData, createURL } from '../../utils/webmerge';
import { getNurseSymlinks } from '../../modules/symlinks/actions';

export const ActionTypes = {
  RESUME_PUBLISH: 'RESUME_PUBLISH',
  RESUME_PUBLISHED: 'RESUME_PUBLISHED',
  HAS_RESUME_PUBLISHED: 'HAS_RESUME_PUBLISHED',
  NEEDS_PUBLISHING: 'NEEDS_PUBLISHING',
  RESET_PUBLISHING: 'RESET_PUBLISHING',
};

export const resetPublishing = () => ({
  type: ActionTypes.RESET_PUBLISHING,
});

export const needsPublishing = () => ({
  type: ActionTypes.NEEDS_PUBLISHING,
});

export const hasResumePublished = (payload = {}, error = null) => ({
  type: ActionTypes.HAS_RESUME_PUBLISHED,
  payload,
  error,
});

const resumePublished = (payload = {}, error = null) => ({
  type: ActionTypes.RESUME_PUBLISHED,
  payload,
  error,
});

export const publishResume = (data) => {
  return (dispatch) => {
    const apiUrl = createURL('merge');
    const newData = prepareWebmergeData(data);
    dispatch({ type: ActionTypes.RESUME_PUBLISH });

    axios.post(
      apiUrl,
      newData,
    ).then(
      () => {
        dispatch(resumePublished());
        dispatch(getNurseSymlinks(data.nurse.id));
      },
      (error) => {
        dispatch(resumePublished(null, error));
      },
    );
  };
};
