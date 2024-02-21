import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { spGetAllItemsToList , spAddItemToList , spEditItemToList,spDeleteItemToList } from "../../sp/list-items";
import { getCurrentDetails } from '../../sp/user-profile';
import { useNavigate } from "react-router-dom";

const LIST_NAME = "Requests";
const LIST_NAME_2 = "Dictionary";

const Create = () => {
  const [allItems, setAllItems] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
      getAllItemsFunc();
      getUserProfile();
      
  }, []);

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList(LIST_NAME);
      const listEntries = await spGetAllItemsToList(LIST_NAME_2);
      setAllEntries(listEntries);
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
        "Create",
        "",
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

  // const

  const checkoutSchema = yup.object().shape({
    term: yup.string()
          .required("Required")
          .test('Unique Term','Term already exists.',
          function(value){
            return new Promise((resolve, reject) => {
              const lowerCaseTerm = value.toLowerCase().trim();
              const existingTerm = allEntries.find(
                entry => entry.Term.toLowerCase().trim() === lowerCaseTerm
              );
              resolve(!existingTerm);
            })
          }),
    definition: yup.string()
          .required("Required"),
    docutitle: yup.string()
          .required("Required"),
    docucode: yup.string()
          .required("Required"),
    doculink: yup.string()
          .required("Required"),
  });
  const initialValues = { 
    term: "",
    acronym: "",
    additional: "",
    definition: "",
    docutitle: "",
    docucode: "",
    doculink: "",
    note: "",
  };

  return (
    <Box m="20px">
      <Header title="CREATE" subtitle="Create a New Entry" />

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
                multiline
                sx={{ gridColumn: "span 2" }}
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
                multiline
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
                multiline
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
                minRows={2}
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
                multiline
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
                multiline
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
                multiline
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
                minRows={2}
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

export default Create;