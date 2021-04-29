export const primaryDetails = (
  firstName,
  middleName,
  lastName,
  states,
  city
) => {
  return {
    type: "PRIMARY_DETAILS",
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    states: states,
    city: city,
  };
};
export const officialDetails = (orgName, experience, salary, age) => {
  return {
    type: "OFFICIAL_DETAILS",
    orgName: orgName,
    experience: experience,
    salary: salary,
    age: age,
  };
};
