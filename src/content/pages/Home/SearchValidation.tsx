import * as Yup from "yup";

const postcodeRegex =
  /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;

export const PostcodeValidationSchema = () =>
  Yup.object().shape({
    postcode: Yup.string()
      .matches(postcodeRegex, "Invalid UK postcode format")
      .required("Postcode is required")
  });

export const NameValidationSchema = () =>
  Yup.object().shape({
    mpName: Yup.string()
      .min(3, "Minimum term 3 chars")
  });
