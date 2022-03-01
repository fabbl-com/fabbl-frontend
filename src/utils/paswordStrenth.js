const value = {
  successMain: "#00e676",
  successDark: "#00c853",
  errorMain: "#f44336",
  orangeMain: "#ffab91",
  warningDark: "#ffc107"
};

const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthColor = (count) => {
  if (count < 2) return { label: "Poor", color: value.errorMain };
  if (count < 3) return { label: "Weak", color: value.warningDark };
  if (count < 4) return { label: "Normal", color: value.orangeMain };
  if (count < 5) return { label: "Good", color: value.successMain };
  if (count < 6) return { label: "Strong", color: value.successDark };
  return { label: "Poor", color: value.errorMain };
};

export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
