import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: food, foodCategory
// Optional fields in body: grams, ounces, calories,
export default async function handle(req, res) {
  const { search } = req.body;

  const session = await getSession({ req });

  const result = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(result);
}
