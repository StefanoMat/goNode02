const { User, Project } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.findAll({
        include: [Project],
        where: { id: req.session.user.id },
      });
      return res.render('dashboard/index', { users });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const projects = await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });
      req.flash('Success', 'Categoria criada com sucesso');
      return res.redirect(`/app/project/${projects.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
