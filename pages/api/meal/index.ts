import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: food, foodCategory
// Optional fields in body: grams, ounces, calories,
export default async function handle(req, res) {
  const { food, foodCategory, grams, ounces, calories } = req.body;

  const session = await getSession({ req });

  const getFloatNumber = num => {
    const stringValue = parseFloat(num).toFixed(2);
    return parseFloat(stringValue);
  };

  const result = await prisma.meal.create({
    data: {
      food: food,
      foodCategory: foodCategory,
      grams: getFloatNumber(grams),
      ounces: getFloatNumber(ounces),
      calories: parseInt(calories),
      user: { connect: { email: session?.user?.email } },
      date: moment().format('l'),
    },
  });
  res.json(result);
}
