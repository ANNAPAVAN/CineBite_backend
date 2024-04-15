const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const JWT = require("jsonwebtoken")


// Mongoose Schema and Model (User)
const adminSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,"Name is required"],
      maxLength:[50,"Name must be < 50 chars"]
    },
    password: {
      type:String,
      required:[true,"Password is required"],
      minLength:[8,"Password has atleast 8 chars"],
    //   select:false
    },
    email: {
      type:String,
      reqired: [true,'Email is required']
    },
    hotel: {
      type:String,
    },
    address:{
      type:String,
    }

  },{timestamps:true});



  adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the salt value 
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


adminSchema.methods = {
    // compare password 
    
    comparePassword: async function(enteredPassword){
        // console.log("hi how",this.password);
        return await bcrypt.compare(enteredPassword, this.password)
    },

    getJWTtoken: function(){
      return JWT.sign({_id: this._id, email:this.email,hotel:this.hotel, address:this.address},"ADMIN", {
        expiresIn: "30m"
      })
    }

}

  
module.exports = mongoose.model("hoteladmin", adminSchema);