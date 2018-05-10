/**
 * Find object in array of objects
 * @param {object} prams - ontinas list, value and key
 *  @param {array} list - We use to serach in
 *  @param {value} object - What we want to find
 *  @param {string} key - By what key we are searching
 * @returns {object|boolean} - if values was found (object), if not (false)
 */
const findObjectInObjects = ({
  list,
  value,
  key,
}) => {
  const length = list.length;
  let found = false;
  for (let i = 0; i < length; i += 1) {
    if (value[key] === list[i][key]) {
      found = { ...list[i] };
      break;
    }
  }

  return found;
};

/**
 * Find value in array of values (string|number)
 * @param {object} prams - ontinas list, value and key
 *  @param {array} list - We use to serach in
 *  @param {value} object - What we want to find
 *  @param {string} key - By what key we are searching
 * @returns {string|number|boolean} - if values was found (string|number), if not (false)
 */
const findValueInValues = ({
  list,
  value,
}) => {
  const length = list.length;
  let found = false;
  for (let i = 0; i < length; i += 1) {
    if (value === list[i]) {
      found = list[i];
      break;
    }
  }

  return found;
};

/**
 * Find value in array of objects
 * @param {object} prams - ontinas list, value and key
 *  @param {array} list - We use to serach in
 *  @param {value} object - What we want to find
 *  @param {string} key - By what key we are searching
 * @returns {object|boolean} - if values was found (object), if not (false)
 */
const findValueInObjects = ({
  list,
  value,
  key,
}) => {
  const length = list.length;
  let found = false;
  for (let i = 0; i < length; i += 1) {
    if (value === list[i][key]) {
      found = { ...list[i] };
      break;
    }
  }

  return found;
};

export default function find({ list = null, value = null, key = null}) {
  if (!list || !value || list.length === 0) {
    return false;
  }
  if (typeof list[0] === 'object' && (typeof value === 'string' || typeof value === 'number') && key) {
    return findValueInObjects({ list, value, key });
  }
  if (typeof list[0] === 'object' && typeof value === 'object' && key) {
    return findObjectInObjects({ list, value, key});
  }
  if ((typeof list[0] === 'string' && typeof value === 'string') ||
    (typeof list[0] === 'number' && typeof value === 'number')) {
    return findValueInValues({ list, value });
  }

  return false;
}
