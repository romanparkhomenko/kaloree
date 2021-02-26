import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';
import moment from 'moment';

// POST /api/post
// Required fields in body: food, foodCategory
// Optional fields in body: grams, ounces, calories,
export default async function handle(req, res) {
  const { pounds } = req.body;

  const session = await getSession({ req });

  const result = await prisma.weight.create({
    data: {
      pounds: parseInt(pounds),
      user: { connect: { email: session?.user?.email } },
      date: moment().format('l'),
    },
  });
  res.json(result);
}
