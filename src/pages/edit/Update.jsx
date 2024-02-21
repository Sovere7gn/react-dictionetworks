import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { spGetAllItemsToList , spAddItemToList , spEditItemToList,spDeleteItemToList } from "../../sp/list-items";
import { getCurrentDetails } from '../../sp/user-profile';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const LIST_NAME = "Requests";
const LIST_NAME_2 = "Dictionary";

const Update = () => {
  const [allItems, setAllItems] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialValues = state?.valuesToPass || {}; 

  useEffect(() => {
      getAllItemsFunc();
      getUserProfile();
  }, []);

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList(LIST_NAME);
      setAllItems(listItems);
  }

  const addItemFunc = async (values) => {
      const item = await spAddItemToList(
        LIST_NAME,
        name,
        office,
        email,
        "Pending",
        values.term
            .trim()
            .replace(/(^\w)/, match => match
            .toUpperCase()),
        values.acronym,
            // .trim()
            // .replace(/\s+\n\s+(?!\s)/g, "\n"),
        values.additional,
            // .trim()
            // .replace(/(^\w)/, match => match
            // .toUpperCase()),
        values.definition
            .trim()
            .replace(/\s+\n\s+(?!\s)/g, "\n")
            .replace(/(^|\n)\w/g, match => match
            .toUpperCase()),
        values.docutitle
            .trim()
            .replace(/\s+\n\s+(?!\s)/g, "\n")
            .replace(/(^|\n)\w/g, match => match
            .toUpperCase()),
        values.docucode
            .trim()
            .replace(/\s+\n\s+(?!\s)/g, "\n")
            .replace(/(^|\n)\w/g, match => match
            .toUpperCase()),
        values.doculink
            .trim()
            .replace(/\s+\n\s+(?!\s)/g, "\n"),
        values.note,
            // .trim()
            // .replace(/(^\w)/, match => match
            // .toUpperCase()),
        "Update",
        String(state.valuesToPass.dictionaryid),
      );

      setAllItems([
          ...allItems,
          item.data
      ])
  }

  const getUserProfile = async () => {
      const user = await getCurrentDetails();
      setName(user.userProps.NewName);
      setOffice(user.userProps.Office);
      setEmail(user.userProps.Email);
  };

  const handleFormSubmit = async (values, actions) => {
    await addItemFunc(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    navigate('/edit')
  };

  return (
    <Box m="20px">
      <Header title="UPDATE" subtitle="Update an Entry" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Term"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.term}
                name="term"
                error={!!touched.term && !!errors.term}
                helperText={touched.term && errors.term}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Acronym"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.acronym}
                name="acronym"
                error={!!touched.acronym && !!errors.acronym}
                helperText={touched.acronym && errors.acronym}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Additional Information"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.additional}
                name="additional"
                error={!!touched.additional && !!errors.additional}
                helperText={touched.additional && errors.additional}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Definition"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.definition}
                name="definition"
                error={!!touched.definition && !!errors.definition}
                helperText={touched.definition && errors.definition}
                multiline
                rows={2}
                sx={{ gridColumn: "span 6" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Document Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.docutitle}
                name="docutitle"
                error={!!touched.docutitle && !!errors.docutitle}
                helperText={touched.docutitle && errors.docutitle}
                sx={{ gridColumn: "span 6" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Document Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.docucode}
                name="docucode"
                error={!!touched.docucode && !!errors.docucode}
                helperText={touched.docucode && errors.docucode}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Document Link"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.doculink}
                name="doculink"
                error={!!touched.doculink && !!errors.doculink}
                helperText={touched.doculink && errors.doculink}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Note to Approver"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
                name="note"
                error={!!touched.note && !!errors.note}
                helperText={touched.note && errors.note}
                multiline
                rows={2}
                sx={{ gridColumn: "span 6" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" pb="20px">
              <Button disabled={isSubmitting} type="submit" color="secondary" variant="contained" >
                Submit Request
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  term: yup.string().required("Required"),
  definition: yup.string().required("Required"),
  docutitle: yup.string().required("Required"),
  docucode: yup.string().required("Required"),
  doculink: yup.string().required("Required"),
});
// const initialValues = {
//   term: "",
//   acronym: "",
//   additional: "",
//   definition: "",
//   docutitle: "",
//   docucode: "",
//   doculink: "",
//   note: "",
// };

export default Update;