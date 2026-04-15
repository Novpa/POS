"use client";

import { useFetchCategory } from "./hooks/useFetchCategory";
import { Category } from "./types/categoryTypes";

export default function CreateNewMenuPage() {
  const { data } = useFetchCategory();

  const categories = data?.data.data;
  console.log(data?.data.data);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-stone-900">
        Create New Menu
      </h2>
      <form>
        <fieldset className="fieldset text-stone-700">
          <legend className="fieldset-legend text-stone-700">Menu Name</legend>
          <input
            type="text"
            className="input w-full bg-white border-stone-300"
            placeholder="Type here"
          />
          <p className="label">Optional</p>
        </fieldset>

        <fieldset className="fieldset text-stone-700">
          <legend className="fieldset-legend text-stone-700">Price</legend>
          <input
            type="text"
            className="input w-full bg-white border-stone-300"
            placeholder="Type here"
          />
          <p className="label">Optional</p>
        </fieldset>

        <fieldset className="fieldset text-stone-700">
          <legend className="fieldset-legend text-stone-700">Categories</legend>
          <select
            defaultValue="Pick a browser"
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
            type="file"
            className="file-input w-full bg-white border-stone-300"
          />
          <label className="label">Max size 2MB</label>
        </fieldset>

        <div className="form-control mb-3">
          <label className="label cursor-pointer justify-start gap-3 text-stone-700">
            <input
              type="checkbox"
              className="toggle toggle-primary border-stone-300"
            />
            <span className="label-text text-stone-700">Is Available</span>
          </label>
        </div>

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full ">
            Save Menu
          </button>
        </div>
      </form>
    </>
  );
}
