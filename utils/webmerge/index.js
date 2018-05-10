import moment from 'moment';
import find from '../ListUtils/find';
import { states_abbreviations } from '../../config';
import WEBMERGE from '../../constants/webmerge';

const formatJobTitles = (experience_job_title = [], allJobTitles) => {
  return experience_job_title.reduce((values, jobTitle) => {
    const selectedJobTitle = find({
      list: allJobTitles,
      value: { id: jobTitle.job_title },
      key: 'id',
    });

    values.push({
      value: selectedJobTitle.title,
    });

    return values;
  }, []);
};

const formatDate = ({ month, year, is_present }) => {
  if (is_present) {
    return 'Present';
  }

  return `${month}/${year}`;
};

const foramtMonths = ({ to_date, from_date, is_present }) => {
  const toDate = is_present ? moment() : moment(to_date);
  const fromDate = moment(from_date);

  return toDate.diff(fromDate, 'months').toString();
};

const foramtExperiences = (experience = [], allJobTitles) => {
  const first = experience[0];
  if (experience.length === 1 && !first.acuity && !first.from_date &&
    !first.from_year && !first.is_present && !first.location && !first.nurse_to_patient &&
    !first.to_date && !first.workplace) {
    return [];
  }

  const formatedExperiences = [];
  experience.forEach(({
    primary,
    workplace,
    location,
    from_date_month,
    from_date_year,
    to_date_month,
    to_date_year,
    experience_job_title,
    is_present,
    from_date,
    to_date,
  }) => {
    const jobTitles = formatJobTitles(experience_job_title, allJobTitles);

    formatedExperiences.push({
      primary: primary || '',
      job_title: jobTitles,
      workplace: workplace || '',
      location: location || '',
      from_date: formatDate({month: from_date_month, year: from_date_year}),
      to_date: formatDate({month: to_date_month, year: to_date_year, is_present}),
      months: foramtMonths({ from_date, to_date, is_present}),
    });
  });

  return formatedExperiences;
};

const foramtLicences = (license = []) => {
  if (license.length === 1 && !license[0].name && !license[0].state) {
    return [];
  }
  return license.map(item => {
    const state = find({
      list: states_abbreviations,
      value: { label: item.state },
      key: 'label',
    });

    return {
      name: item.name,
      expires: item.expires ? moment(item.expires).format('MM/DD/YYYY') : '',
      state: state ? state.value : '',
    };
  });
};

const foramtEducation = (education = []) => {
  if (education.length === 1 &&
    !education[0].degree &&
    !education[0].school &&
    !education[0].state &&
    !education[0].to_date) {
    return [];
  }
  return education.map(({ degree, school, state, to_date_year }) => ({
    degree,
    school,
    location: state,
    year: to_date_year || '',
  }));
};

const foramtCerts = (certification = []) => {
  if (certification.length === 1 &&
    !certification[0].name &&
    !certification[0].expires) {
    return [];
  }
  return certification.map((cert) => ({
    name: cert.name,
    expires: cert.expiration_date ? moment(cert.expiration_date).format('MM/DD/YYYY') : '',
  }));
};

const foramtEmrs = (emrs = []) => {
  if (emrs.length === 0) {
    return [];
  }
  return emrs.map((emr) => emr.name);
};

export const prepareWebmergeData = ({
  nurse,
  allJobTitles,
}) => {
  const {
    id,
    first_name = '',
    last_name = '',
    city = '',
    country = '',
    experience,
    certification,
    emr_proficiency,
    license,
    education,
  } = nurse;

  const formatedData = {
    id,
    name: `${first_name}_${last_name}`,
    type: 'pdf',
    output: 'pdf',
    First: first_name,
    Last: last_name,
    City: city,
    State: country,
  };

  const formatedEmrs = foramtEmrs(emr_proficiency);
  if (formatedEmrs.length !== 0) {
    formatedData.emrs = formatedEmrs;
  }

  const formatedCerts = foramtCerts(certification);
  if (formatedCerts.length !== 0) {
    formatedData.certs = formatedCerts;
  }

  const formatedLicenses = foramtLicences(license);
  if (formatedLicenses.length !== 0) {
    formatedData.licenses = formatedLicenses;
  }

  const formatedEducations = foramtEducation(education);
  if (formatedEducations.length !== 0) {
    formatedData.educations = formatedEducations;
  }

  const formatedExperience = foramtExperiences(experience, allJobTitles);
  if (formatedExperience.length !== 0) {
    formatedData.experiences = formatedExperience;
  }

  return formatedData;
};


export const createURL = (type) => {
  const { ID, URL, KEY } = WEBMERGE;
  if (type === 'merge') {
    return `${URL}/${type}/${ID}/${KEY}`;
  }
  return `${URL}/${type}`;
};
