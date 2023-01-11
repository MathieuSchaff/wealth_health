import styled from "styled-components";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const SHome = styled.main`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Home = () => {
  return (
    <SHome>
      <Header to="/users" toDescription="View users" homepage={true} />
      <Form />
    </SHome>
  );
};

export default Home;
