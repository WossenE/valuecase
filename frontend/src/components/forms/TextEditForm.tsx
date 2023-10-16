import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Button from "../Button";

interface TextData {
  title: string;
  body: string;
  id: string;
}

interface TextEditFormProps {
  id: string;
  title: string;
  body: string;
  closeModal: () => void;
}

function TextEditForm({ id, title, body, closeModal }: TextEditFormProps) {
  const initialValues: TextData = {
    title,
    body,
    id,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
  });

  const handleSubmit = async (
    values: TextData,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.put(`/api/textblocks/${id}`, values);

      console.log("POST response:", response.data);

      resetForm();
      closeModal();
    } catch (err) {
      console.error("POST request error:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Edit your Text here</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <Field
              type="text"
              name="title"
              id="title"
              className="block w-full p-2 rounded-lg"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body">Body</label>
            <Field
              as="textarea"
              name="body"
              id="body"
              className="block w-full p-2 rounded-lg"
            />
            <ErrorMessage
              name="body"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="flex justify-end">
            <Button lable="Submit" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default TextEditForm;
