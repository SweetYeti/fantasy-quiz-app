export const validateProfile = (profile) => {
  console.log('Validating profile:', JSON.stringify(profile, null, 2));

  if (!profile || typeof profile !== 'object') {
    console.error('Profile is not an object');
    return false;
  }

  const requiredFields = [
    'spiritualArchetype',
    'coreStrengths',
    'growthAreas',
    'elementalInfluence',
    'practicalWisdom',
    'reflectiveQuestions',
    'personalMantra',
    'conclusion',
    'portraitDescription'
  ];

  for (const field of requiredFields) {
    console.log(`Checking field: ${field}`);
    if (!profile.hasOwnProperty(field)) {
      console.error(`Missing required field: ${field}`);
      return false;
    }

    switch (field) {
      case 'spiritualArchetype':
        if (!profile[field].title || !profile[field].description) {
          console.error(`Invalid spiritualArchetype structure: ${JSON.stringify(profile[field])}`);
          return false;
        }
        break;
      case 'coreStrengths':
      case 'growthAreas':
        if (!Array.isArray(profile[field]) || profile[field].length !== 2 || !profile[field].every(item => item.title && item.description)) {
          console.error(`Invalid ${field} structure: ${JSON.stringify(profile[field])}`);
          return false;
        }
        break;
      case 'practicalWisdom':
        if (!Array.isArray(profile[field]) || profile[field].length !== 2 || !profile[field].every(item => item.title && item.description && item.benefit)) {
          console.error(`Invalid ${field} structure: ${JSON.stringify(profile[field])}`);
          return false;
        }
        break;
      case 'reflectiveQuestions':
        if (!Array.isArray(profile[field]) || profile[field].length !== 3) {
          console.error(`Invalid reflectiveQuestions structure: ${JSON.stringify(profile[field])}`);
          return false;
        }
        break;
      case 'portraitDescription':
      case 'elementalInfluence':
      case 'personalMantra':
      case 'conclusion':
        if (typeof profile[field] !== 'string') {
          console.error(`Invalid ${field} type: ${typeof profile[field]}`);
          return false;
        }
        break;
      default:
        // This case handles any unexpected fields
        console.warn(`Unexpected field in profile: ${field}`);
        break;
    }
  }

  console.log('Profile validation successful');
  return true;
};