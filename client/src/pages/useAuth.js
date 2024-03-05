import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function useAuth() {
  // calling useContext will return the "value" of the provider
  return useContext(AuthContext);
}