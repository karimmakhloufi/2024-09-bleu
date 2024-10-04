import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { category } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: Date;
  category: number;
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as category[]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/categories");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchCategories();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/ads", data);
    toast.success("Ad has been added");
    navigate("/");
  };
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
          <label>
            Image:
            <br />
            <input
              className="text-field"
              {...register("picture", {
                minLength: { value: 2, message: "Minimum 2 characters" },
                required: "This field is required",
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="picture"
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
            Category :
            <br />
            <select {...register("category")}>
              {categories.map((el) => (
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
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewAdFormPage;
