/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import projectImage from "../../../images/projectImage.jpg";
import { usePortfolioQuery } from "../../../api";
import { Project, Skills } from "../../../types";

const Portfolio: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { style } = useThemeContext();


  const { data } = usePortfolioQuery(token);
  const user = data?.user ?? null;
  const projects: Project[] = user?.projects ?? [];
  const skills: Skills = user?.skills ?? { techSkills: [], softSkills: [] };

  return (
    <main css={style.portfolio}>
      <h1
        data-testid="username"
        css={style.h1}
        tabIndex={0}
        aria-label="Welcome message for the user"
        aria-describedby="Welcome message"
      >
        {user && (
          <>
            👋, I am {user.fullName}, <br /> The {user.jobTitle}, you are
            looking for.
          </>
        )}
      </h1>

      <section
        css={style.skillsContainer}
        tabIndex={0}
        aria-labelledby="skills-section-title"
      >
        {user && (
          <div>
            <h4>Email: {user.email}</h4>
            <h4>Job title: {user.jobTitle}</h4>
          </div>
        )}
        <div css={style.skillDiv}>
          <h4>Technical Skills</h4>
          {skills?.techSkills?.map((skill, index) => (
            <span key={index} tabIndex={0}>
              {skill}
            </span>
          ))}
        </div>
        <div css={style.skillDiv}>
          <h4>Soft Skills</h4>
          {skills?.softSkills?.map((skill, index) => (
            <span key={index} tabIndex={0}>
              {skill}
            </span>
          ))}
        </div>
      </section>
      <h2 css={style.h1}>Projects</h2>
      {projects.map((project) => (
        <section
          key={project._id}
          css={style.div}
          tabIndex={0}
          aria-labelledby={`project-title-${project._id}`}
        >
          <h3 css={style.title}>{project.name}</h3>

          <div css={style.container}>
            <img
              css={style.img}
              src={
                project.image
                  ? `${API_BASE_URL}/${project.image}`
                  : projectImage
              }
              alt={`Screenshot of ${project.name} project`}
            />
            <div css={style.description}>
              <p css={style.p}>{project.description}</p>
            </div>
          </div>
          {project.link && (
            <a css={style.a} href={project.link}>
              View project
            </a>
          )}
        </section>
      ))}
      <footer css={style.footer} tabIndex={0}>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>
      </footer>
    </main>
  );
};

export default Portfolio;
