import { useParams } from "react-router-dom";
import { useGetAdByIdQuery } from "../generated/graphql-types";
import CreateOrUpdateAdForm from "../components/CreateOrUpdateAdForm";

const UpdateAdPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetAdByIdQuery({
    variables: { getAdByIdId: parseInt(id as string) },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    console.log("data", data);
    return <CreateOrUpdateAdForm defaultValues={data.getAdById} />;
  }
};
export default UpdateAdPage;
