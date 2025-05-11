const designController = require('../controllers/designController');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/create-user-design', auth, designController.create_user_design);
router.get('/user-design/:design_id', auth, designController.get_user_design);
router.get('/user-designs', auth, designController.get_user_designs);
router.put('/update-user-design/:design_id', auth, designController.update_user_design);
router.delete('/delete-user-design/:design_id', auth, designController.delete_user_design);

router.post('/add-user-image', auth, designController.add_user_image);
router.get('/get-user-images', auth, designController.get_user_images);
router.delete('/delete-user-image/:design_id', auth, designController.delete_user_image); // ✅ FIXED

module.exports = router;






















