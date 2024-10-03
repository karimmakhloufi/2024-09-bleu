import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
};

const NewCategoryFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios.post("http://localhost:3000/categories", data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de la catégorie:
          <br />
          <input
            className="text-field"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="error-message">This field is required</span>
          )}
        </label>
        <input type="submit" className="button" />
      </form>
    </>
  );
};

export default NewCategoryFormPage;
