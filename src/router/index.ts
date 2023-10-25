import * as express from 'express';
import { Request, Response } from 'express';
import ThreadController from '../controllers/ThreadController';
import AuthController from '../controllers/AuthController';
import authenticate from '../middlewares/auth';
import { upload } from '../middlewares/upload';
import threadqueues from '../queue/threadqueues';
import LikeController from '../controllers/LikeController';
import UserController from '../controllers/UserController';
import { uploadUpdate } from '../middlewares/uploadUpdate';
import RepliesController from '../controllers/RepliesController';
import FollowsController from '../controllers/FollowsController';

const router = express.Router();


router.get('/', (req: Request, res: Response) => {
    res.send("ini v1")
})

router.get('/threads', authenticate, ThreadController.find)
// router.post('/thread', authenticate, upload('image'), ThreadController.create)
router.post('/thread', authenticate, upload('image'), threadqueues.create)
router.put('/thread/:id', authenticate, uploadUpdate('image'), ThreadController.update)

router.get('/thread/:id', authenticate, ThreadController.findOne)
router.delete('/thread/:id', ThreadController.delete)

// Auth
router.post('/auth/register', AuthController.create)
router.post('/auth/login', AuthController.login)

//like
router.post('/like', authenticate, LikeController.create);
router.delete('/like/:threadId', authenticate, LikeController.delete);

//user
router.get('/users', authenticate, UserController.find);
// router.get('/user/:id', authenticate, UserController.findOne);
router.get('/user/:id', authenticate, UserController.profile);
router.put('/user/:id', authenticate, uploadUpdate('profile_picture'), UserController.update);

//replies
router.get('/replies', authenticate, RepliesController.find);
router.post('/reply', authenticate, RepliesController.create);

//follows
router.get("/follows", authenticate, FollowsController.find);
router.post("/follow", authenticate, FollowsController.create);
// router.delete(
//   "/follow/:followed_user_id",
//   authenticate,
//   FollowsController.delete
// );


//check authentication
router.get('/check', authenticate, AuthController.checking)








export default router;