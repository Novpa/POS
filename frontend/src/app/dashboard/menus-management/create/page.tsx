"use client";

import { Formik } from "formik";
import { useFetchCategory } from "./hooks/useFetchCategory";
import { Category } from "./types/categoryTypes";
import { api } from "@/utils/axiosInstance";

export default function CreateNewMenuPage() {
  const { data } = useFetchCategory();
  const categories = data?.data.data;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-stone-900">
        Create New Menu
      </h2>
      <Formik
        initialValues={{
          name: "",
          price: "",
          files: [] as File[],
          // isAvailable: true,
          categoryId: "",
        }}
        onSubmit={async (values) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("price", values.price);
          formData.append("categoryId", values.categoryId);
          values.files.map((file) => formData.append("menuImages", file));

          try {
            const res = await api.post("/menus", formData);
            console.log("post data", res);
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ values, errors, handleChange, handleSubmit, setValues }) => (
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset text-stone-700">
              <legend className="fieldset-legend text-stone-700">
                Menu Name
              </legend>
              <input
                name="name"
                onChange={handleChange}
                value={values.name}
                type="text"
                className="input w-full bg-white border-stone-300"
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset text-stone-700">
              <legend className="fieldset-legend text-stone-700">Price</legend>
              <input
                name="price"
                onChange={handleChange}
                value={values.price}
                type="text"
                className="input w-full bg-white border-stone-300"
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset text-stone-700">
              <legend className="fieldset-legend text-stone-700">
                Categories
              </legend>
              <select
                name="categoryId"
                onChange={handleChange}
                value={values.categoryId}
                // defaultValue="Pick a browser"
                className="select bg-white text-stone-700 border-stone-300">
                <option disabled={true}>Pick a category</option>
                {categories?.map((category: Category, index: number) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </fieldset>

            <fieldset className="fieldset text-stone-700">
              <legend className="fieldset-legend text-stone-700">
                Menu Image(s)
              </legend>
              <input
                name="files"
                onChange={(e) => {
                  const files = e.currentTarget.files;

                  // checking is required as Array.from() cannot receive any undefined or null value
                  if (files) {
                    setValues({ ...values, files: Array.from(files) });
                  }
                }}
                type="file"
                className="file-input w-full bg-white border-stone-300"
                multiple
              />
              <label className="label">Max size 2MB</label>
            </fieldset>

            {/* <div className="form-control mb-3">
              <label className="label cursor-pointer justify-start gap-3 text-stone-700">
                <input
                  name="isAvailable"
                  onChange={handleChange}
                  value={values.isAvailable}
                  type="checkbox"
                  className="toggle toggle-primary border-stone-300"
                />
                <span className="label-text text-stone-700">Is Available</span>
              </label>
            </div> */}

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full ">
                Save Menu
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
