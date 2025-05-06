import { Link } from "react-router-dom";
import { Category } from "../features/competitions/competitionsTypes";
import { Button } from "@mui/material";

const categoryLabels: Category = {
  pictures: "Pictures",
  recipes: "Recipes",
  exams: "Exams"
};

const Home = () => {
  return (
    <div>
      {Object.entries(categoryLabels).map(([key, label]) => (
        <div key={key}>
          <Link to={`/competitions/${key}`}>
            <Button>
              {label}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
