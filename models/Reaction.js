const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionID:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody:{
      type: String,
      required: true,
      maxlength: 280,
    },
    username:{
      type:String,
      required: true,
    },
    createdAt:{
      type: Date,
      default: Date.now,
      get: function(createdAt){
        return createdAt.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }
    },
  },
  {
    toJSON:{
      getters:true,
    },
  }
);

module.exports = reactionSchema;