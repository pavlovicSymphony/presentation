/**
 * Webmerge publish selectors
 * selectors were used to memoized data
 */
import { createSelector } from 'reselect';

/**
 * Webmerge state selector
 */
const webmergeState = ({ webmerge }) => (webmerge);

/**
 * Webmerge isPublished selector
 */
export const isResumePublishedSelector = createSelector(
  [webmergeState],
  (webmerge) => (webmerge.get('isPublished')),
);

/**
 * Webmerge isPublishing selector
 */
export const isResumePublishingSelector = createSelector(
  [webmergeState],
  (webmerge) => (webmerge.get('isPublishing')),
);

/**
 * Webmerge hasPublished selector
 */
export const hasResumePublishedOnAwsSelector = createSelector(
  [webmergeState],
  (webmerge) => (webmerge.get('hasPublished'))
);

/**
 * Webmerge needsPublishing selector
 */
export const resumeNeedsPublishingSelector = createSelector(
  [webmergeState],
  (webmerge) => (webmerge.get('needsPublishing'))
);
