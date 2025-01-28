# GitHub Actions Workflows Explanation

---

## **1. Verify Docker Build**

### **Trigger:**
- This workflow is triggered on a **pull request** targeting the `main` branch.

### **Purpose:**
- To verify that the Docker image for the project can be successfully built during pull requests.

### **Steps:**
1. **Checkout Code**
   Uses the `actions/checkout@v4` action to clone the repository code into the workflow runner.

2. **Create `.env` File**
   Dynamically creates an `.env` file using the `MAIN_ENV` secret. This file stores environment variables required during runtime for the build process.

3. **Build Docker Image**
   Executes a `docker build` command to build the Docker image for the project using the `Dockerfile` in the repository.

---

## **2. Code Quality**

### **Trigger:**
- This workflow is triggered on a **pull request** targeting the `main` branch.

### **Purpose:**
- To ensure code quality checks are run on every pull request.

### **Steps:**
1. **Checkout Code**
   Uses the `actions/checkout@v4` action to clone the repository code into the workflow runner.

2. **Setup Biome**
   Sets up **Biome**, a tool used for linting and formatting, by using the `biomejs/setup-biome@v2` action. It installs the latest version of Biome.

3. **Run Biome**
   Runs `biome ci` to perform code quality checks. For monorepos, you can modify this command to target specific directories or provide configuration files (e.g., `biome ci ./project --config-path ./project`).

---

## **3. Build and Push Docker Images**

### **Trigger:**
- This workflow is triggered on a **push** to the `main` branch.

### **Purpose:**
- To build and push Docker images to Docker Hub and create a GitHub release.

### **Jobs:**

#### **Job 1: Build and Push Docker Image**

1. **Checkout Code**
   Uses the `actions/checkout@v4` action to clone the repository code.

2. **Create `.env` File**
   Dynamically creates an `.env` file using the `MAIN_ENV` secret to store runtime environment variables.

3. **Login to Docker Hub**
   Uses the `docker/login-action@v3` action to authenticate to Docker Hub using `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets.

4. **Build and Push Docker Image**
   - Builds the Docker image using the `docker build` command and tags it with `toxicblade/project-name:project`.
   - Pushes the image to Docker Hub using the `docker push` command.

#### **Job 2: Release**

1. **Bump Version and Push Tag**
   Uses the `mathieudutour/github-tag-action@v6.2` action to:
   - Automatically increment the project version.
   - Push the new tag to GitHub.

2. **Create a GitHub Release**
   Uses the `ncipollo/release-action@v1` action to:
   - Create a new GitHub release.
   - Use the tag created in the previous step.
   - Automatically generate release notes using the tag’s changelog.

### **Job Dependency:**
- The **Release** job depends on the successful completion of the **build-project** job (`needs: [build-project]`).

