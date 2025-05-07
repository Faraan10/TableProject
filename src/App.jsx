import TableContainer from "./components/TableContainer";
import data from "./data/data.json"; // data
import "./App.css";

const App = () => {
  return (
    <>
      <TableContainer data={data} />
    </>
  );
};
export default App;
