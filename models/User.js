var mongoose = require('mongoose'); 
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true, max: 100},
    lastname: {type: String, required: true, max: 100},
    rol: {type: String, required: true, max: 100},
    user: {type: String, required: true, max: 100,unique: true,trim: true},
    password: {type: String, required: true, max: 100},
    mail: {type: String, required: false, max: 100, unique: true,trim: true},
    esActivo: {type: Boolean, required: true,trim: true}, 
    created_at: { type: Date, default: Date.now },
    ad_user_id: {type: String, required: true, max: 100,unique: true,trim: true},
}); 
 
//authenticate input against database
UserSchema.statics.authenticate = function (user, password, callback) {
    User.findOne({ user: user })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true &&  user.esActivo) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
    });
}
 

  UserSchema.statics.authenticateEncript = function (vuser, password, callback) {
  
    User.findOne({ user: vuser })
      .exec(function (err, user) { 
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        } 
        if (password === user.password && user.esActivo) {
          return callback(null, user);
        } else {
          return callback();
        } 
      });
  }

  
  UserSchema.pre('findOneAndUpdate', async function (next) {

    try {
      const stringPassword = this.getUpdate().$set.password; 
      var buf = Buffer.from(stringPassword);  
       if (buf.indexOf('replacement_code_for_encryption') > 0)  {
        try {   
          this.getUpdate().$set.password = await bcrypt.hash(stringPassword.replace('replacement_code_for_encryption', ''), 10); 
          return next();
        } catch (err) {  
          return next(err);
        }
      }  
    } catch (error) { 
      return next();
    } 

  }); 
 

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    } 
    )
  }); 


var User = mongoose.model('User', UserSchema);
module.exports = User;
// module.exports = mongoose.model('User', UserSchema);