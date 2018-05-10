/**
 * Webmerge actions
 */
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

/**
 * It uses methods form utils/webmerge
 * Webmerge was used to create nurse PDF resume.
 * By sending data to the webmerge we were able to reuse pdf tamplate for resume,
 * after merging data and template it was send to the aws by webmerge hooks.
 */
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
        //After it was sent to aws we fatch urls to the files that was uploaded
        dispatch(getNurseSymlinks(data.nurse.id));
      },
      (error) => {
        dispatch(resumePublished(null, error));
      },
    );
  };
};
