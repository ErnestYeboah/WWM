/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { RecipesValues } from "../types/Types";
//RecipesValues is a type

import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
type ChildrenProps = {
  children: React.ReactNode;
};

type Exports = {
  isLoading: boolean;
  errorMsg: string;
  data: RecipesValues[] | null;
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  submitInput: (e: React.FormEvent<HTMLFormElement>) => void;
  addToFavorites(currentItem: RecipesValues): void;
  favoritesRecipes: RecipesValues[];
};

const RecipeContext = createContext<Exports | null>(null);

export function useRecipeContext() {
  const object = useContext(RecipeContext);
  if (!object) {
    throw new Error("Please provide a provider");
  }
  return object;
}

export default function RecipeGlobalState({ children }: ChildrenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<RecipesValues[] | null>([]);
  const [searchInput, setSearchInput] = useState("apples");
  const [favoritesRecipes, setFavoritesRecipes] = useState<RecipesValues[]>([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchInput}`
      );

      if (response.statusText === "OK") {
        setIsLoading(false);
        setData(response.data.data.recipes);
        navigate("/");
        setSearchInput("");
        setErrorMsg("");
      }

      if (response.data.data.recipes.length === 0) {
        throw new Error("No results found");
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : "Could not fetch data!";
      setErrorMsg(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function submitInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetchData();

    if (errorMsg !== "") {
      setErrorMsg("");
    }
  }

  function addToFavorites(currentItem: RecipesValues) {
    const cpyFavoritesRecipes = [...favoritesRecipes];

    const index = cpyFavoritesRecipes.findIndex(
      (item) => item.id === currentItem.id
    );

    if (index === -1) {
      cpyFavoritesRecipes.push(currentItem);
    } else {
      cpyFavoritesRecipes.splice(0, 1);
    }
    setFavoritesRecipes(cpyFavoritesRecipes);
  }

  return (
    <RecipeContext.Provider
      value={{
        isLoading,
        errorMsg,
        data,
        searchInput,
        setSearchInput,
        submitInput,
        addToFavorites,
        favoritesRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
