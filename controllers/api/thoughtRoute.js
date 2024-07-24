const router = require('express').Router();
const { User, Thought} = require ('../../models');

//get all thoughts
router.get('/', async (req,res) => {
  try{
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err){
    res.status(500).json(err.message);
  }
});

//get one thought
router.get('/:thoughtId', async (req,res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//create new thought
router.post('/',async (req, res) => {
  try {
    const thought = await Thought.create(
      {
        thoughtText:req.body.thoughtText,
        username:req.body.username
      }    
    );
    
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: {thoughts: thought._id} },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err.message);
  }
})

//update one thought 
router.put('/:thoughtId', async (req, res) => {
  try{
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    );
    res.json("edited thought")
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//delete one thought
router.delete('/:thoughtId', async (req, res) => {
 try{
   await Thought.findOneAndDelete({ _id: req.params.thoughtId });
   res.json("thought deleted")
 } 
 catch (err) {
   res.status(500).json(err.message);
 }
});

//creating a reaction to a thought
router.post('/:thoughtId/reactions', async (req,res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: {reactions:req.body} },
      { new: true }
    );

    res.json(updatedThought);
  } catch (err){
    res.status(500).json(err.message);
  }
});

//delete a reaction to a thought
router.delete('/:thoughtId/reactions/:reactionID', async (req,res) => {
  try {
    console.log(req.params.reactionID)
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionID: req.params.reactionID } } }
    );
    res.json("reaction deleted");
  } catch (err){
    res.status(500).json(err.message);
  }
});

module.exports = router;