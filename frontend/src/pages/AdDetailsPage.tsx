import { useParams } from "react-router-dom";

const AdDetailsPage = () => {
  const { id } = useParams();
  return <p>Displaying the details of ad {id}</p>;
};

export default AdDetailsPage;
