const { User, Project, Section } = require('../models');

module.exports = {
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

      const sections = await Section.findById(req.params.id);
      console.log(sections);
      return res.render('project/index', {
        users,
        projects,
        sections,
        activeId: req.params.id,
        projectId: req.params.projectId,
      });
    } catch (err) {
      return next(err);
    }
  },
  async store(req, res, next) {
    try {
      const sections = await Section.create({
        title: req.body.title,
        content: null,
        ProjectId: req.params.projectId,
      });
      req.flash('Success', 'Categoria criada com sucesso');
      return res.redirect(`/app/project/${sections.ProjectId}/sections/${sections.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      const sections = await Section.findById(req.params.id);

      await sections.update(req.body);

      req.flash('success', 'Editado com sucesso!');

      return res.redirect(`/app/project/${sections.ProjectId}/sections/${sections.id}`);
    } catch (err) {
      return next(err);
    }
  },
  async destroy(req, res, next) {
    try {
      const sections = await Section.findById(req.params.id);

      await sections.destroy(req.body);

      return res.redirect(`/app/project/${sections.ProjectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
