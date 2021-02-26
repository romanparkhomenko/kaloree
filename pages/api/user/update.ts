import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: food, foodCategory
// Optional fields in body: grams, ounces, calories,
export default async function handle(req, res) {
  const { name, weightGoal, calorieGoal, email } = req.body;

  const session = await getSession({ req });

  const result = await prisma.user.update({
    where: {
      email: session?.user?.email,
    },
    data: {
      name: name,
      weightgoal: parseInt(weightGoal),
      caloriegoal: parseInt(calorieGoal),
      email: email,
    },
  });
  res.json(result);
}
