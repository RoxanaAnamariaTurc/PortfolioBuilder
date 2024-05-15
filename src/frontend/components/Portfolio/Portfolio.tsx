/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../../UserContext";
import { Skills } from "../UserDashboard/UserDashboard";
import { useThemeContext } from "../ThemeContext";

interface Project {
  _id?: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skills>({
    techSkills: [],
    softSkills: [],
  });
  const [loading, setLoading] = useState(true);

  const { userId } = useParams<{ userId: string }>();
  const { style } = useThemeContext();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const [userResponse, projectsResponse, skillsResponse] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/user/${userId}`),
          axios.get(`${API_BASE_URL}/projects/${userId}`),
          axios.get(`${API_BASE_URL}/user/${userId}/skills`),
        ]);

      setUser(userResponse.data.user);
      setProjects(projectsResponse.data);

      setSkills({
        techSkills: [...skillsResponse.data.techSkills],
        softSkills: [...skillsResponse.data.softSkills],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div css={style.portfolio}>
      <h1 data-testid="username" css={style.h1}>
        {user && (
          <>
            👋, I am {user.fullName}, <br /> The {user.jobTitle}, you are
            looking for.
          </>
        )}
      </h1>

      <div css={style.skillsContainer}>
        {user && (
          <div>
            <h4>Email: {user.email}</h4>
            <h4>Job title: {user.jobTitle}</h4>
          </div>
        )}
        <div css={style.skillDiv}>
          <h4>Technical Skills</h4>
          {skills?.techSkills?.map((skill) => <span>{skill}</span>)}
        </div>
        <div css={style.skillDiv}>
          <h4>Soft Skills</h4>
          {skills?.softSkills?.map((skill) => <span>{skill}</span>)}
        </div>
      </div>
      <h2 css={style.h1}>Projects</h2>
      {projects.map((project) => (
        <div key={project._id} css={style.div}>
          <h3 css={style.title}>{project.name}</h3>

          <div css={style.container}>
            <img
              css={style.img}
              src={`${API_BASE_URL}/${project.image}`}
              alt={project.name}
            />
            <div css={style.description}>
              <p css={style.p}>{project.description}</p>
            </div>
          </div>

          <a css={style.a} href={project.link}>
            View project
          </a>
        </div>
      ))}
      <footer css={style.footer}>Made with ❤️</footer>
    </div>
  );
};

export default Portfolio;
