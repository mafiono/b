export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export const genderTitle: Record<Gender, string> = {
  [Gender.Male]: 'Male',
  [Gender.Female]: 'Female',
};
