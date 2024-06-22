const router = require('express').Router();
const { User, Thought} = require ('../../models');

//get all users
router.get('/', async (req,res) => {
  try{
    const users = await User.find();
    res.json(users);
  } catch (err){
    res.status(500).json(err.message);
  }
});

//get one user
router.get('/:userId', async (req,res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//create new user
router.post('/',async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
})

//edit a user
router.put('/:userId', async (req,res)=> {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
})

//delete a user
router.destory('/:userID', async (req,res) =>{
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err.message);
  }
})

//add friend to friend list
router.post('/:userId/friends/:friendId', async (req,res) =>{
  try {
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err.message);
  }
})

//delete friend from friend lsit
router.destory('/:userId/friends/:friendId', async (req,res) =>{
  try{
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err.message);
  }
})


module.exports = router;

module.exports = {
  
  // //get all users
  // async getUsers(req,res) {
  //   try{
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (err){
  //     res.status(500).json(err.message);
  //   }
  // },
  // //get one user
  // async getSingleUser(req, res) {
  //   try {
  //     const user = await User.findOne({ _id: req.params.userId });
  //     if (!user) {
  //       return res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // },
  // //post/create one user
  // async createUser(req, res) {
  //   try {
  //     const user = await User.create(req.body);
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // },
  // //edit/put one user
  // async updateUser(req, res) {
  //   try {
  //     const user = await User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $set: req.body },
  //       { runValidators: true, new: true }
  //     );

  //     if (!user) {
  //       res.status(404).json({ message: 'No user with this id!' });
  //     }

  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // },
  // //delete one user
  // async deleteUser(req, res) {
  //   try {
  //     const user = await User.findOneAndDelete({ _id: req.params.userId });

  //     if (!user) {
  //       res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     await Thought.deleteMany({ _id: { $in: user.thoughts } });
  //     res.json({ message: 'User and thoughts deleted!' });
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
  // },
};