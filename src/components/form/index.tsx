"use client";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { usePages } from "@/store";

interface Values {
  title: string;
  description: string;
}

const ProductCreationForm = () => {
  const createOrUpdateDashboardEntry = usePages(
    (state) => state.createOrUpdateDashboardEntry
  );
  const data = usePages((state) => state.data);
  const router = useRouter();
  const LandingPageSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .matches(/^[a-zA-Z0-9\s]*$/, "No alphanumeric characters.")
      .required("Required"),
    description: Yup.string()
      .min(2, "Too Short!")
      .max(200, "Too Long!")
      .required("Required"),
  });

  const handlePageCreation = (values: Values) => {
    const { title, description } = values;

    data[title] = {
      title,
      description,
      placement: [],
      view: {
        footer: {
          type: "footer",
          name: "Footer",
          text: "Footer text goes here",
        },
        header: {
          type: "header",
          name: "Header",
          text: "Header text goes here",
        },
        textBlock: {
          type: "text",
          name: "Text Block",
          text: "Lorem ipsum dolor sit amet..",
        },
        image: {
          type: "image",
          name: "Image",
          src: "",
        },
      },
      isPublished: false,
    };
    createOrUpdateDashboardEntry(data[title]);
    router.push(`landing-pages/${title}`);
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={LandingPageSchema}
      onSubmit={(values: Values) => {
        handlePageCreation(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Title
            </label>
            <Field
              id="title"
              name="title"
              placeholder="Landing Page 1.."
              className="border text-sm rounded-lg block w-full p-2.5 "
            />
            {errors.title && touched.title ? (
              <div className="text-red-500 my-2 font-bold">{errors.title}</div>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Description
            </label>
            <Field
              id="description"
              name="description"
              placeholder="Lorem ipsum dolor sit amet..."
              className="border text-sm rounded-lg block w-full p-2.5"
            />
            {errors.description && touched.description ? (
              <div className="text-red-500 my-2 font-bold">
                {errors.description}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="p-2.5 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductCreationForm;
