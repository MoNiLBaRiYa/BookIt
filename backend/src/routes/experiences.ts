import express from 'express';
import { getAllExperiences, getExperienceById } from '../controllers/experienceController';

const router = express.Router();

// GET /api/experiences - Get all experiences with optional filters
router.get('/', getAllExperiences);

// GET /api/experiences/:id - Get experience by ID with slots
router.get('/:id', getExperienceById);

export default router;