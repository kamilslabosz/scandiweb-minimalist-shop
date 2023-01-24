import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} params={params} />;
};
