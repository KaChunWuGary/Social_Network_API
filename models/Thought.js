const { Schema,Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt:{
      type: Date,
      default: Date.now,
      get: function(createdAt){
        return createdAt.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }
    },
    username:{
      type: String,
      required: true,
    },
    reactions:[reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const Thought = model('thought',thoughtSchema);

module.exports = Thought;
