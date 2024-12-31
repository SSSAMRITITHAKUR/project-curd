const express = require('express');
const { sequelize, User, Project } = require('./models');
const { validateUser, validateProject } = require('./validation'); 

const app = express();
app.use(express.json());

const PORT = 3000;


sequelize.sync({ force: false })
  .then(() => console.log('All models were synchronized successfully.'))
  .catch((err) => console.error('Failed to synchronize models:', err));


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

app.post('/users', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

app.post('/projects', async (req, res) => {
  const { error } = validateProject(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

app.post('/users/:userId/projects/:projectId', async (req, res) => {
  try {
    const { userId, projectId } = req.params;

    const user = await User.findByPk(userId);
    const project = await Project.findByPk(projectId);

    if (!user || !project) {
      return res.status(404).json({ error: 'User or Project not found.' });
    }

    await user.addProject(project); 
    res.json({ message: 'User assigned to project successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign user to project.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





























