import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  upsertContactController,
  patchContactController,
  deleteContactController
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
router.patch('/contacts/:cotactId', ctrlWrapper(patchContactController));
router.delete('/contacts/:cotactId', ctrlWrapper(deleteContactController));


export default router;
