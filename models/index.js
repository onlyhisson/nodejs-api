const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Domain = require('./domain')(sequelize, Sequelize);

// 1:N 관계
db.User.hasMany(db.Post);   // hasMany 
db.Post.belongsTo(db.User); // hasMany 반대

// N:M 관계, 새로운 모델(PostHashtag)이 생성, 두 테이블의 아이디가 저장
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });  // 
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',  // 외래키
  as: 'Followers',            // 새로운 모델(Followers)이 생성
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});
db.User.hasMany(db.Domain);
db.Domain.belongsTo(db.User);

// 1:1 관계
// db.User.hasOne(db.Info, { foreignKey: 'user_id', sourceKey: 'id' });
// db.Info.hasOne(db.User, { foreignKey: 'user_id', targetKey: 'id' });

module.exports = db;  // db를 require 하여 각 model에 접근할 수 있다.
