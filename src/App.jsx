import TableContainer from "./components/TableContainer";
import initialData from "./data/data.json"; // mockdata
import "./App.css";

const App = () => {
  return (
    <>
      <TableContainer initialData={initialData} />
    </>
  );
};
export default App;
