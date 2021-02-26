import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: food, foodCategory
// Optional fields in body: grams, ounces, calories,
export default async function handle(req, res) {
  const { friendId } = req.body;

  const session = await getSession({ req });

  const result = await prisma.friends.create({
    data: {
      friendId: parseInt(friendId),
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
