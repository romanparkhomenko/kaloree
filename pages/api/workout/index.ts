import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: workout
// Optional fields in body: minutes, weight, caloriesBurnt,
export default async function handle(req, res) {
  const { workout, minutes, caloriesBurnt, weight } = req.body;

  const session = await getSession({ req });

  const result = await prisma.workout.create({
    data: {
      workout: workout,
      minutes: parseInt(minutes),
      caloriesBurnt: parseInt(caloriesBurnt),
      weight: parseInt(weight),
      user: { connect: { email: session?.user?.email } },
      date: moment().format('l'),
    },
  });
  res.json(result);
}
