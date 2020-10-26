import { useContext } from "react";
import { storesContext } from "../contexts/context";


export const useStores = () => useContext(storesContext);
