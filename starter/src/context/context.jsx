import { createContext, useContext, useEffect, useState } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { customInstance } from "../utils/utils";

const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {
  const [gitHubUser, setGitHubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [request, setRequests] = useState();
  const [loading, setLoading] = useState(false);

  const checkRequest = async () => {
    const { data } = await customInstance("/rate_limit");
    const { rate } = data;
    setRequests(rate.remaining);
  };

  const searchGithubUser = async (user) => {
    try {
      setLoading(true);
      console.log(user);
      if (user) {
        const response1 = await customInstance(`/users/${user}`);
        const response2 = await customInstance(
          `/users/${user}/repos?per_page=100`
        );
        const response3 = await customInstance(`/users/${user}/followers`);
        console.log(response1);
        console.log(response2);
        console.log(response3);
        setGitHubUser(response1.data);
        setRepos(response2.data);
        setFollowers(response3.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    checkRequest();
    setLoading(false);
  }, []);

  return (
    <GitHubContext.Provider
      value={{
        gitHubUser,
        repos,
        followers,
        request,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export const globalContext = () => useContext(GitHubContext);
