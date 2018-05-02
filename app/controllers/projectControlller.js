const { User, Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.findAll({
        include: [Project],
        where: { id: req.session.user.id },
      });
      return res.render('project/index', { users });
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const users = await User.findAll({
        include: [Project],
        where: { id: req.session.user.id },
      });

      const projects = await Project.findAll({
        include: [Section],
        where: { id: req.params.projectId },
      });
      console.log(projects);
      return res.render('project/index', {
        users,
        projects,
        projectId: req.params.projectId,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const project = await Project.findById(req.params.projectId);

      await project.destroy(req.body);

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },
};
