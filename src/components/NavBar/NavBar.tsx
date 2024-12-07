import { Link } from "react-router-dom";
import "../components-styles.css";
import { useRecipeContext } from "../../context/RecipeContext";

export default function NavBar() {
  const { searchInput, setSearchInput, submitInput } = useRecipeContext();

  return (
    <nav>
      <h3>
        <Link to={"/"}>Pizza Corp</Link>
      </h3>

      <form onSubmit={submitInput}>
        <input
          type="text"
          placeholder="Search a recipe"
          value={searchInput}
          name="recipe"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>

      <div className="nav__links">
        <Link to={"/"}>Home</Link>
        <Link to={"/favorites"}>Favorites</Link>
        <Link to={"/recipe-item/:id"}>Details</Link>
      </div>
    </nav>
  );
}
