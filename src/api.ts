import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Project, Skills, PortfolioResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const getProjectsQueryKey = (token: string | null) => [
  "projects",
  token ?? "guest",
] as const;

export const getSkillsQueryKey = (token: string | null) => [
  "skills",
  token ?? "guest",
] as const;

export const getPortfolioQueryKey = (token: string | null) => [
  "portfolio",
  token ?? "guest",
] as const;

const normaliseProject = (project: Project | (Project & { id?: string })) => ({
  _id: project._id ?? project.id,
  name: project.name,
  description: project.description,
  image: project.image,
  link: project.link,
});

const resolveError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || error.message || "Network error";
    return new Error(message);
  }
  return error instanceof Error
    ? error
    : new Error("An unexpected error occurred");
};

export const fetchProjects = async (
  portfolioToken: string
): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(
      `${API_BASE_URL}/projects/${portfolioToken}`
    );
    return response.data;
  } catch (error) {
    throw resolveError(error);
  }
};

export const fetchSkills = async (portfolioToken: string): Promise<Skills> => {
  try {
    const response = await axios.get<Skills>(
      `${API_BASE_URL}/user/${portfolioToken}/skills`
    );
    return response.data;
  } catch (error) {
    throw resolveError(error);
  }
};

export const fetchPortfolio = async (
  portfolioToken: string
): Promise<PortfolioResponse> => {
  try {
    const response = await axios.get<PortfolioResponse>(
      `${API_BASE_URL}/portfolio/${portfolioToken}`
    );
    return response.data;
  } catch (error) {
    throw resolveError(error);
  }
};

export const useProjectsQuery = (portfolioToken: string | null) =>
  useQuery<Project[], Error>({
    queryKey: getProjectsQueryKey(portfolioToken),
    queryFn: () => {
      if (!portfolioToken) {
        return Promise.resolve([] as Project[]);
      }
      return fetchProjects(portfolioToken);
    },
    enabled: Boolean(portfolioToken),
    placeholderData: () => [],
  });

export const useSkillsQuery = (portfolioToken: string | null) =>
  useQuery<Skills, Error>({
    queryKey: getSkillsQueryKey(portfolioToken),
    queryFn: () => {
      if (!portfolioToken) {
        return Promise.resolve({
          techSkills: [],
          softSkills: [],
        } as Skills);
      }
      return fetchSkills(portfolioToken);
    },
    enabled: Boolean(portfolioToken),
    placeholderData: () => ({ techSkills: [], softSkills: [] }),
  });

export const usePortfolioQuery = (portfolioToken: string | undefined) =>
  useQuery<PortfolioResponse, Error>({
    queryKey: getPortfolioQueryKey(portfolioToken ?? null),
    queryFn: () => {
      if (!portfolioToken) {
        throw new Error("Missing portfolio token");
      }
      return fetchPortfolio(portfolioToken);
    },
    enabled: Boolean(portfolioToken),
  });

export const useCreateProjectMutation = (portfolioToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, FormData, {
    previousProjects: Project[];
    optimisticId: string;
  }>({
    mutationFn: async (formData) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/projects`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        return normaliseProject(response.data);
      } catch (error) {
        throw resolveError(error);
      }
    },
    onMutate: async (formData) => {
      const key = getProjectsQueryKey(portfolioToken);
      await queryClient.cancelQueries({ queryKey: key });
      const previousProjects =
        queryClient.getQueryData<Project[]>(key) ?? [];
      const optimisticId = `temp-${Date.now()}`;
      const optimisticProject: Project = {
        _id: optimisticId,
        name: (formData.get("name") as string) ?? "",
        description: (formData.get("description") as string) ?? "",
        link: (formData.get("link") as string) ?? "",
        image: "",
      };
      queryClient.setQueryData<Project[]>(key, [
        ...previousProjects,
        optimisticProject,
      ]);
      return { previousProjects, optimisticId };
    },
    onError: (_error, _variables, context) => {
      const key = getProjectsQueryKey(portfolioToken);
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(key, context.previousProjects);
      }
    },
    onSuccess: (project, _variables, context) => {
      const key = getProjectsQueryKey(portfolioToken);
      queryClient.setQueryData<Project[]>(key, (current = []) =>
        current.map((existing) =>
          existing._id === context?.optimisticId ? project : existing
        )
      );
    },
    onSettled: () => {
      const key = getProjectsQueryKey(portfolioToken);
      queryClient.invalidateQueries({ queryKey: key });
      queryClient.invalidateQueries({
        queryKey: getPortfolioQueryKey(portfolioToken),
      });
    },
  });
};

export const useEditProjectMutation = (portfolioToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<
    Project,
    Error,
    { userId: string; projectId: string; formData: FormData },
    { previousProjects: Project[] }
  >({
    mutationFn: async ({ userId, projectId, formData }) => {
      try {
        const response = await axios.put<Project[]>(
          `${API_BASE_URL}/projects/${userId}/${projectId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const updatedProject = response.data.find(
          (project) => project._id === projectId || project.id === projectId
        );
        if (updatedProject) {
          return normaliseProject(updatedProject);
        }
        return {
          _id: projectId,
          name: (formData.get("name") as string) ?? "",
          description: (formData.get("description") as string) ?? "",
          link: (formData.get("link") as string) ?? "",
          image: "",
        };
      } catch (error) {
        throw resolveError(error);
      }
    },
    onMutate: async ({ projectId, formData }) => {
      const key = getProjectsQueryKey(portfolioToken);
      await queryClient.cancelQueries({ queryKey: key });
      const previousProjects =
        queryClient.getQueryData<Project[]>(key) ?? [];
      const nextProjects = previousProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              name: (formData.get("name") as string) ?? project.name,
              description:
                (formData.get("description") as string) ?? project.description,
              link: (formData.get("link") as string) ?? project.link,
            }
          : project
      );
      queryClient.setQueryData<Project[]>(key, nextProjects);
      return { previousProjects };
    },
    onError: (_error, _variables, context) => {
      const key = getProjectsQueryKey(portfolioToken);
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(key, context.previousProjects);
      }
    },
    onSuccess: (project) => {
      const key = getProjectsQueryKey(portfolioToken);
      queryClient.setQueryData<Project[]>(key, (current = []) =>
        current.map((existing) =>
          existing._id === project._id ? { ...existing, ...project } : existing
        )
      );
    },
    onSettled: () => {
      const key = getProjectsQueryKey(portfolioToken);
      queryClient.invalidateQueries({ queryKey: key });
      queryClient.invalidateQueries({
        queryKey: getPortfolioQueryKey(portfolioToken),
      });
    },
  });
};

export const useDeleteProjectMutation = (portfolioToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { userId: string; projectId: string },
    { previousProjects: Project[] }
  >({
    mutationFn: async ({ userId, projectId }) => {
      try {
        await axios.delete(
          `${API_BASE_URL}/users/${userId}/projects/${projectId}`
        );
      } catch (error) {
        throw resolveError(error);
      }
    },
    onMutate: async ({ projectId }) => {
      const key = getProjectsQueryKey(portfolioToken);
      await queryClient.cancelQueries({ queryKey: key });
      const previousProjects =
        queryClient.getQueryData<Project[]>(key) ?? [];
      queryClient.setQueryData<Project[]>(key, (current = []) =>
        current.filter((project) => project._id !== projectId)
      );
      return { previousProjects };
    },
    onError: (_error, _variables, context) => {
      const key = getProjectsQueryKey(portfolioToken);
      if (context?.previousProjects) {
        queryClient.setQueryData<Project[]>(key, context.previousProjects);
      }
    },
    onSettled: () => {
      const key = getProjectsQueryKey(portfolioToken);
      queryClient.invalidateQueries({ queryKey: key });
      queryClient.invalidateQueries({
        queryKey: getPortfolioQueryKey(portfolioToken),
      });
    },
  });
};

export const useAddSkillsMutation = (portfolioToken: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<
    Skills,
    Error,
    { skills: Skills },
    { previousSkills?: Skills }
  >({
    mutationFn: async ({ skills }) => {
      if (!portfolioToken) {
        throw new Error("Missing portfolio token");
      }
      try {
        const response = await axios.post<Skills>(
          `${API_BASE_URL}/user/${portfolioToken}/skills`,
          { skills }
        );
        return response.data;
      } catch (error) {
        throw resolveError(error);
      }
    },
    onMutate: async ({ skills }) => {
      if (!portfolioToken) {
        return {};
      }
      const key = getSkillsQueryKey(portfolioToken);
      await queryClient.cancelQueries({ queryKey: key });
      const previousSkills = queryClient.getQueryData<Skills>(key);
      queryClient.setQueryData<Skills>(key, (current) => ({
        techSkills: Array.from(
          new Set([...(current?.techSkills ?? []), ...skills.techSkills])
        ),
        softSkills: Array.from(
          new Set([...(current?.softSkills ?? []), ...skills.softSkills])
        ),
      }));
      return { previousSkills };
    },
    onError: (_error, _variables, context) => {
      if (portfolioToken && context?.previousSkills) {
        queryClient.setQueryData<Skills>(
          getSkillsQueryKey(portfolioToken),
          context.previousSkills
        );
      }
    },
    onSuccess: (updatedSkills) => {
      if (portfolioToken) {
        queryClient.setQueryData<Skills>(
          getSkillsQueryKey(portfolioToken),
          updatedSkills
        );
        queryClient.invalidateQueries({
          queryKey: getPortfolioQueryKey(portfolioToken),
        });
      }
    },
    onSettled: () => {
      if (portfolioToken) {
        queryClient.invalidateQueries({
          queryKey: getSkillsQueryKey(portfolioToken),
        });
      }
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      localStorage.setItem("portfolioToken", response.data.token);
    }
    return response.data;
  } catch (error: any) {
    localStorage.removeItem("portfolioToken");
    console.error("Error during login:", error);
    throw error;
  }
};

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  localStorage.setItem("portfolioToken", response.data.token);
  return response;
};


export const editUserDetails = async (
  portfolioToken: string,
  formData: { fullName: string; email: string; jobTitle: string },
  userId: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${portfolioToken}`,
    },
  };

  const response = await axios.put(
    `${API_BASE_URL}/user/${userId}`,
    JSON.stringify(formData),
    config
  );

  return response.data;
};
