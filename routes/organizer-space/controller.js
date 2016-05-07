'use strict';

exports.index = (req, res, next) => {
    res.render('organizer-space/index', {
        title: 'Organizer Space'
    });
};

exports.newConfy = (req, res, next) => {
    res.render('organizer-space/tpl/new-confy.html', {
        title: 'Organizer Space',
        confy: {
            open: true,
            new: true
        }
    });
};

exports.listConfy = (req, res, next) => {
    res.render('organizer-space/tpl/list-confy.html', {
        title: 'Organizer Space',
        confy: {
            open: true,
            list: true
        }
    });
};

exports.listExperts = (req, res, next) => {
    res.render('organizer-space/tpl/list-experts.html', {
        title: 'Organizer Space',
        program: {
            open: true,
            list_experts: true
        }
    });
};

exports.listMembres = (req, res, next) => {
  res.render('organizer-space/tpl/list-membres.html', {
        title: 'Organizer Space',
      program: {
          open: true,
          list_membres: true
      }
  });  
};

exports.listAuteurs = (req, res, next) => {
    res.render('organizer-space/tpl/list-auteurs.html', {
        title: 'Organizer Space',
        auteurs: true
    });
};

exports.listParticipants = (req, res, next) => {
    res.render('organizer-space/tpl/list-participants.html', {
        title: 'Organizer Space',
        participants: true
    });
};

exports.badges = (req, res, next) => {
    res.render('organizer-space/tpl/badges.html', {
        title: 'Organizer space',
        badges: true
    });
};

exports.mailing = (req, res, next) => {
    res.render('organizer-space/tpl/mailing.html', {
        title: 'Organizer space',
        mailing: true
    });
};
