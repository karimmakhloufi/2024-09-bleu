import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { useGetAllCategoriesAndTagsQuery } from "../generated/graphql-types";

const CreateOrUpdateAdForm = ({ defaultValues }: { defaultValues: object }) => {
  const { error, loading, data } = useGetAllCategoriesAndTagsQuery();
  type Inputs = {
    title: string;
    description: string;
    owner: string;
    price: string;
    pictures: { url: string }[];
    location: string;
    createdAt: string;
    category: string;
    tags: string[];
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data from react hook form", data);
    const dataForBackend = {
      ...data,
      price: parseInt(data.price),
      createdAt: data.createdAt + "T00:00:00.000Z",
      tags: data.tags ? data.tags.map((el) => ({ id: parseInt(el) })) : [],
    };

    console.log("data for backend", dataForBackend);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <label>
              Titre de l'annonce:
              <br />
              <input
                className="text-field"
                {...register("title", {
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <label>
              Description:
              <br />
              <input
                className="text-field"
                {...register("description", {
                  minLength: { value: 10, message: "Minimum 10 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <label>
              Vendeur:
              <br />
              <input
                className="text-field"
                {...register("owner", {
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="owner"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <label>
              Prix :
              <br />
              <input
                type="number"
                className="text-field"
                {...register("price", {
                  min: { value: 0, message: "Minimum 0" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="price"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <br />
            <button
              className="button"
              type="button"
              onClick={() => append({ url: "" })}
            >
              Add Image
            </button>
            <br />
            <div className="field">
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <section className="image-input-and-remove">
                      <input
                        className="text-field"
                        placeholder="Your image url"
                        {...register(`pictures.${index}.url` as const)}
                      />
                      <button className="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                      <br />
                    </section>
                    <span>{errors.pictures?.[index]?.url?.message}</span>
                  </div>
                );
              })}
            </div>
          </>
          <br />
          <>
            <label>
              Ville :
              <br />
              <input
                className="text-field"
                {...register("location", {
                  minLength: { value: 2, message: "Minimum 2 characters" },
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="location"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <label>
              Date :
              <br />
              <input
                type="date"
                className="text-field"
                {...register("createdAt", {
                  required: "This field is required",
                })}
              />
            </label>
            <ErrorMessage
              errors={errors}
              name="createdAt"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            <label>
              <br />
              Category :
              <br />
              <select {...register("category")}>
                {data.getAllCategories.map((el: any) => (
                  <option key={el.id} value={el.id}>
                    {el.title}
                  </option>
                ))}
              </select>
            </label>
            <ErrorMessage
              errors={errors}
              name="createdAt"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => {
                  console.log(message);
                  return (
                    <Fragment key={type}>
                      <br />
                      <span className="error-message">{message}</span>
                    </Fragment>
                  );
                })
              }
            />
          </>
          <br />
          <>
            {data.getAllTags.map((tag) => (
              <label key={tag.id}>
                <input type="checkbox" value={tag.id} {...register("tags")} />
                {tag.name}
              </label>
            ))}
          </>

          <input type="submit" className="button" />
        </form>
      </>
    );
  }
};

export default CreateOrUpdateAdForm;
